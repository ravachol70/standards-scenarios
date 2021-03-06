const UniReceiver = artifacts.require("UniReceiver");
const Checker = artifacts.require("Checker");
// const ExternalReceiver = artifacts.require("ExternalReceiver");
// const DelegateReceiver = artifacts.require("DelegateReceiver");
// const BasicBareReceiver = artifacts.require("BasicBareReceiver");

const {
    BN,
    ether,
    expectRevert,
    expectEvent
} = require("openzeppelin-test-helpers");

contract("Receivers", accounts => {
    let uni = {};
    const token_interface =
        "0xb281fc8c12954d22544db45de3159a39272895b169a852b314f9cc762e44c53b";
    beforeEach(async () => {
        uni = await UniReceiver.new();
    });
    it("Can check for implementing interface", async () => {
        const token_interface =
            "0xb281fc8c12954d22544db45de3159a39272895b169a852b314f9cc762e44c53b";
        let tx = await uni.universalReceiver(token_interface, "0x");
        console.log(
            "Directly checking for implementing interface costs: ",
            tx.receipt.gasUsed
        );
        let res = await uni.universalReceiver.call(token_interface, "0x");
        assert.equal(res, token_interface);
    });

    it("Can check for implementing interface with Bytes", async () => {
        const token_interface =
            "0xb281fc8c12954d22544db45de3159a39272895b169a852b314f9cc762e44c53b";
        let tx = await uni.universalReceiver(token_interface, "0x");
        console.log(
            "Directly checking for implementing interface using bytes costs: ",
            tx.receipt.gasUsed
        );
        let res = await uni.universalReceiverBytes.call(token_interface, "0x");
        assert.equal(res, token_interface);
    });

    it("Contract can check for implementing interface with Bytes32", async () => {
        let checker = await Checker.new();
        let tx = await checker.checkImplementation(uni.address, token_interface);
        console.log(
            "Contract checking for implementing interface using bytes32 costs: ",
            tx.receipt.gasUsed
        );
        let res = await checker.checkImplementation.call(
            uni.address,
            token_interface
        );
        assert.isTrue(res);
    });

    it("Contract can check for implementing interface with Bytes", async () => {
        let checker = await Checker.new();
        let tx = await checker.checkImplementationBytes(
            uni.address,
            token_interface
        );
        console.log(
            "Contract checking for implementing interface using bytes return costs: ",
            tx.receipt.gasUsed
        );
        let res = await checker.checkImplementation.call(
            uni.address,
            token_interface
        );
        assert.isTrue(res);
    });

    it("Contract can check for implementing interface with Low Level call", async () => {
        let checker = await Checker.new();
        let tx = await checker.lowLevelCheckImplementation(
            uni.address,
            token_interface
        );
        console.log(
            "Contract checking for implementing interface using low level and bytes32 costs: ",
            tx.receipt.gasUsed
        );
        let res = await checker.checkImplementation.call(
            uni.address,
            token_interface
        );
        assert.isTrue(res);
    });

    it("Contract can check for implementing interface with Low Level cal + Bytes", async () => {
        let checker = await Checker.new();
        let tx = await checker.lowLevelCheckImplementationBytes(
            uni.address,
            token_interface
        );
        console.log(
            "Contract checking for implementing interface using low level and bytes return costs: ",
            tx.receipt.gasUsed
        );
        let res = await checker.checkImplementation.call(
            uni.address,
            token_interface
        );
        assert.isTrue(res);
    });
});
