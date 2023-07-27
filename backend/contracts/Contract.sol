// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract ElectronicsResale {
    event Added(uint256 index);

    struct State {
        address s_modifier;
        string date;
        string info;
        string location;
    }

    struct Product {
        address owner;
        string productName;
        string category;
        string image;
        uint256 productId;
        string specs;
        string location;
        State[] states;
    }

    mapping(uint => Product) public allProducts;
    uint256 public items = 0;

    function newItem(
        address _owner,
        string memory _pname,
        string memory _category,
        string memory _image,
        string memory _info,
        string memory _location
    ) public returns (bool) {
        Product storage product = allProducts[items];
        product.owner = _owner;
        product.productName = _pname;
        product.productId = items;
        product.category = _category;
        product.image = _image;
       
         product.states.push(
            State({
                date: uint2str(block.timestamp),
                info: _info,
                s_modifier: product.owner,
                location: _location
            })
        );

        items = items + 1;
        emit Added(items - 1);
        return true;
    }

    
    function uint2str(uint256 _i) internal pure returns (string memory str) {
        if (_i == 0) {
            return "0";
        }
        uint256 j = _i;
        uint256 length;
        while (j != 0) {
            length++;
            j /= 10;
        }
        bytes memory bstr = new bytes(length);
        uint256 k = length;
        while (_i != 0) {
            k = k - 1;
            uint8 temp = (48 + uint8(_i - (_i / 10) * 10));
            bytes1 b1 = bytes1(temp);
            bstr[k] = b1;
            _i /= 10;
        }
        str = string(bstr);
    }

    function addState(
        uint _productId,
        string memory _info,
        string memory _location
    ) public returns (bool) {
        require(_productId <= items);

        Product storage product = allProducts[_productId];

        product.states.push(
            State({
                date: uint2str(block.timestamp),
                 info: _info,
                 location: _location,
                 s_modifier: msg.sender
            })
        );
        return true;
    }


      function searchProduct(
        uint _productId
    ) public view returns (State[] memory) {
        require(_productId <= items);
        Product storage product = allProducts[_productId];
        return (product.states);
    }
}