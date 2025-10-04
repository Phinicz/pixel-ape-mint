// SPDX-License-Identifier: MIT
pragma solidity ^0.8.15;

import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721EnumerableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";

contract ANONS is
    Initializable,
    ERC721EnumerableUpgradeable,
    OwnableUpgradeable,
    ReentrancyGuardUpgradeable,
    PausableUpgradeable
{
    uint256 public constant MAX_SUPPLY = 4444;
    uint256 public mintPrice;
    uint256 public maxPerWallet;
    uint256 public totalMinted;
    string private _baseTokenURI;

    mapping(address => uint256) public mintedPerWallet;

    event Mint(address indexed minter, uint256 indexed tokenId);
    event MintPriceUpdated(uint256 newPrice);
    event MaxPerWalletUpdated(uint256 newMax);
    event BaseURIUpdated(string newBaseURI);

    function initialize(
        string memory name,
        string memory symbol,
        uint256 initialMintPrice,
        uint256 initialMaxPerWallet,
        string memory initialBaseURI
    ) public initializer {
        __ERC721_init(name, symbol);
        __ERC721Enumerable_init();
        __Ownable_init();
        __ReentrancyGuard_init();
        __Pausable_init();

        mintPrice = initialMintPrice;
        maxPerWallet = initialMaxPerWallet;
        _baseTokenURI = initialBaseURI;
        totalMinted = 0;
    }

    function setMintPrice(uint256 newPrice) external onlyOwner {
        mintPrice = newPrice;
        emit MintPriceUpdated(newPrice);
    }

    function setMaxPerWallet(uint256 newMax) external onlyOwner {
        maxPerWallet = newMax;
        emit MaxPerWalletUpdated(newMax);
    }

    function setBaseURI(string memory uri) external onlyOwner {
        _baseTokenURI = uri;
        emit BaseURIUpdated(uri);
    }

    function mint() external payable nonReentrant whenNotPaused {
        require(msg.value >= mintPrice, "Incorrect payment");
        require(totalMinted < MAX_SUPPLY, "Max supply reached");
        require(
            mintedPerWallet[msg.sender] < maxPerWallet,
            "Max per wallet reached"
        );
        uint256 tokenId = totalMinted + 1;
        _safeMint(msg.sender, tokenId);
        totalMinted = tokenId;
        mintedPerWallet[msg.sender] += 1;
        emit Mint(msg.sender, tokenId);
    }

    function ownerMint(address to) external onlyOwner nonReentrant {
        require(totalMinted < MAX_SUPPLY, "Max supply reached");
        uint256 tokenId = totalMinted + 1;
        _safeMint(to, tokenId);
        totalMinted = tokenId;
        emit Mint(to, tokenId);
    }

    function withdraw() external onlyOwner nonReentrant {
        payable(owner()).transfer(address(this).balance);
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }

    function _baseURI() internal view override returns (string memory) {
        return _baseTokenURI;
    }
}
