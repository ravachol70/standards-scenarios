pragma solidity 0.5.10;

import "./ERC777Receiver.sol";
import "../../_LSPs/LSP1_UniversalReceiver.sol";
import "../../../node_modules/@openzeppelin/contracts/introspection/ERC1820Implementer.sol";
import "../../Account/Account.sol";

contract RecievingAccount is Account, UniversalReceiver, ERC1820Implementer {
    
    ERC777Receiver public receiver;

    function changeReceiver(address _newReceiver) onlyOwner external {
        receiver = ERC777Receiver(_newReceiver);
    }

    function universalReceiver(bytes32 typeId ,bytes calldata data) external returns(bytes32 ret){
        ret = receiver.universalReceiver(msg.sender, typeId,data);
        emit Received(typeId,data);
    }


}
