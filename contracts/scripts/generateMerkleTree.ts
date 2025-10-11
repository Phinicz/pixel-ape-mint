import * as fs from 'fs';
import * as path from 'path';
import { MerkleTree } from 'merkletreejs';
import keccak256 from 'keccak256';

// Regex for Ethereum addresses
const addressRegex = /0x[a-fA-F0-9]{40}/;

// Read CSV file
const csvPath = path.join(__dirname, '../whitelist.csv');
const lines = fs.readFileSync(csvPath, 'utf8').split(/\r?\n/);

// Extract addresses (ignore group names and amounts)
const addresses: string[] = [];
for (const line of lines) {
  const match = line.match(addressRegex);
  if (match) {
    addresses.push(match[0].toLowerCase());
  }
}

// Remove duplicate addresses
const uniqueAddresses = Array.from(new Set(addresses));

// Build Merkle tree
const leaves = uniqueAddresses.map(addr => keccak256(addr));
const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });
const merkleRoot = tree.getHexRoot();

console.log("Merkle Root:", merkleRoot);

// Generate proofs for each address
const proofs: Record<string, string[]> = {};
uniqueAddresses.forEach(addr => {
  const leaf = keccak256(addr);
  const proof = tree.getHexProof(leaf);
  proofs[addr] = proof;
});

// Save proofs for frontend
const outputPath = path.join(__dirname, 'proofs.json');
fs.writeFileSync(outputPath, JSON.stringify(proofs, null, 2));
console.log("Proofs saved to proofs.json");