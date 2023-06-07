// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";


contract TruflationDataFetcher is ChainlinkClient, ConfirmedOwner {
  using Chainlink for Chainlink.Request;
  
  string public yoyInflation;
  string public foodInflation;
  string public housingInflation;
  string public transportationInflation;
  string public medicalInflation;
  string public educationInflation;
  string public personalItemInflation;

  using Chainlink for Chainlink.Request;
  address public oracleId;
  string public jobId;
  uint256 public fee;

  mapping(string=>string) categoryToInflationRate;

  /**
    Network Details derived from Market.Chainlink Truflation Rinkeby
    https://market.link/nodes/969f6cd9-40f3-4dd6-aa02-4fa8c8421480/integrations
   */

  //Job Id changed on deployed contract to : e5b99e0a2f79402998187b11f37c56a6
  constructor() ConfirmedOwner(msg.sender) {
    setPublicChainlinkToken();
    oracleId = 0x17dED59fCd940F0a40462D52AAcD11493C6D8073;
    jobId = "b04c2a85143c43089c1befe7c41dea93";
    fee = 0.1 * 10 ** 18;
  }
        
  function requestYoyInflation() public returns (bytes32 requestId) {
    Chainlink.Request memory req = buildChainlinkRequest(
      bytes32(bytes(jobId)),
      address(this),
      this.fulfillYoyInflation.selector
    );
    req.add("service", "truflation/current");
    req.add("keypath", "yearOverYearInflation");
    req.add("abi", "json");
    return sendChainlinkRequestTo(oracleId, req, fee);
  }

  function fulfillYoyInflation(
    bytes32 _requestId,
    bytes memory _inflation
  ) public recordChainlinkFulfillment(_requestId) {
    yoyInflation = string(_inflation);
  }

  /**
    Truflation APIs not available for categories below currently. 
    Team has indicated that we are to use placeholders for the time being. 
    Will update once available.
   */

    //Food
  function requestFoodInflation() public returns (bytes32 requestId) {
    Chainlink.Request memory req = buildChainlinkRequest(
      bytes32(bytes(jobId)),
      address(this),
      this.fulfillFoodInflation.selector
    );
    req.add("service", "truflation/current");
    req.add("keypath", "foodInflation");
    req.add("abi", "json");
    return sendChainlinkRequestTo(oracleId, req, fee);
  }

  function fulfillFoodInflation(
    bytes32 _requestId,
    bytes memory _inflation
  ) public recordChainlinkFulfillment(_requestId) {
    foodInflation = string(_inflation);
  }

  //Housing
  function requestHousingInflation() public returns (bytes32 requestId) {
    Chainlink.Request memory req = buildChainlinkRequest(
      bytes32(bytes(jobId)),
      address(this),
      this.fulfillHousingInflation.selector
    );
    req.add("service", "truflation/current");
    req.add("keypath", "housingInflation");
    req.add("abi", "json");
    return sendChainlinkRequestTo(oracleId, req, fee);
  }

  function fulfillHousingInflation(
    bytes32 _requestId,
    bytes memory _inflation
  ) public recordChainlinkFulfillment(_requestId) {
    housingInflation = string(_inflation);
  }

  //Transportation
  function requestTransportationInflation() public returns (bytes32 requestId) {
    Chainlink.Request memory req = buildChainlinkRequest(
      bytes32(bytes(jobId)),
      address(this),
      this.fulfillTransportationInflation.selector
    );
    req.add("service", "truflation/current");
    req.add("keypath", "transportationInflation");
    req.add("abi", "json");
    return sendChainlinkRequestTo(oracleId, req, fee);
  }

  function fulfillTransportationInflation(
    bytes32 _requestId,
    bytes memory _inflation
  ) public recordChainlinkFulfillment(_requestId) {
    transportationInflation = string(_inflation);
  }

  //Education
  function fulfillEducationInflation(
    bytes32 _requestId,
    bytes memory _inflation
  ) public recordChainlinkFulfillment(_requestId) {
    educationInflation = string(_inflation);
  }

  function requestEducationInflation() public returns (bytes32 requestId) {
    Chainlink.Request memory req = buildChainlinkRequest(
      bytes32(bytes(jobId)),
      address(this),
      this.fulfillEducationInflation.selector
    );
    req.add("service", "truflation/current");
    req.add("keypath", "educationInflation");
    req.add("abi", "json");
    return sendChainlinkRequestTo(oracleId, req, fee);
  }

  //Medical
  function fulfillMedicalInflation(
    bytes32 _requestId,
    bytes memory _inflation
  ) public recordChainlinkFulfillment(_requestId) {
    medicalInflation = string(_inflation);
  }

  function requestMedicalInflation() public returns (bytes32 requestId) {
    Chainlink.Request memory req = buildChainlinkRequest(
      bytes32(bytes(jobId)),
      address(this),
      this.fulfillMedicalInflation.selector
    );
    req.add("service", "truflation/current");
    req.add("keypath", "personalItemInflation");
    req.add("abi", "json");
    return sendChainlinkRequestTo(oracleId, req, fee);
  }
  
  //Personal Items
  function fulfillpersonalItemInflation(
    bytes32 _requestId,
    bytes memory _inflation
  ) public recordChainlinkFulfillment(_requestId) {
    personalItemInflation = string(_inflation);
  }

  function requestpersonalItemInflation() public returns (bytes32 requestId) {
    Chainlink.Request memory req = buildChainlinkRequest(
      bytes32(bytes(jobId)),
      address(this),
      this.fulfillpersonalItemInflation.selector
    );
    req.add("service", "truflation/current");
    req.add("keypath", "personalItemInflation");
    req.add("abi", "json");
    return sendChainlinkRequestTo(oracleId, req, fee);
  }

  function simulateRequestForCategoryInflations() public {
      foodInflation="13.16";
      housingInflation="12.14";
      transportationInflation="21.40";
      medicalInflation="3.26";
      educationInflation="1.41";
      personalItemInflation="5.01";
  }


  function changeOracle(address _oracle) public onlyOwner {
    oracleId = _oracle;
  }

  function changeJobId(string memory _jobId) public onlyOwner {
    jobId = _jobId;
  }

  function getChainlinkToken() public view returns (address) {
    return chainlinkTokenAddress();
  }

  function withdrawLink() public onlyOwner {
    LinkTokenInterface link = LinkTokenInterface(chainlinkTokenAddress());
    require(link.transfer(msg.sender, link.balanceOf(address(this))),
    "Unable to transfer");
  }

}