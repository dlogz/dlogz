import json
import os
import re
import requests

# from textstat import flesch_reading_ease
from cdp import Cdp, Wallet
from swarm import Agent

# Get configuration from environment variables
API_KEY_NAME = os.environ.get("CDP_API_KEY_NAME")
PRIVATE_KEY = os.environ.get("CDP_PRIVATE_KEY", "").replace('\\n', '\n')

# Configure CDP with environment variables
Cdp.configure(API_KEY_NAME, PRIVATE_KEY)

file_path = "wallet_seed.json"
# agent_wallet = Wallet.create
wallet_id = '02ef5dac-c224-41ce-9d21-1cf0f8a967d0'
# Load the wallet using the seed from the file
try:
  agent_wallet = Wallet.fetch(wallet_id)
  agent_wallet.load_seed(file_path=file_path)
  print("Wallet loaded successfully from seed.")
except Exception as e:
  print(f"Error loading wallet from seed: {e}")
  exit(1)

# Export wallet data
try:
  wallet_data = agent_wallet.export_data()
  wallet_dict = wallet_data.to_dict()
  print("Wallet data exported successfully.")
except Exception as e:
  print(f"Error exporting wallet data: {e}")
  exit(1)

# Request funds from the faucet (only works on testnet)
try:
  faucet = agent_wallet.faucet()
  print(f"Faucet transaction: {faucet}")
  print(f"Agent wallet address: {agent_wallet.default_address.address_id}")
except Exception as e:
  print(f"Error requesting funds from the faucet: {e}")
  exit(1)

# List of abusive words for filtering (can be extended)
ABUSIVE_WORDS = ["abuse", "offensive", "slur", "hate"]


def analyze_blog_text(blob_id: str, contract_address: str) -> str:
  """
    Fetch blog text using a blob ID and analyze its content for estimated reading time,
    content quality, and abusive words.

    Args:
        blob_id (str): The blob ID to fetch the blog content.
        contract_address (str): The contract address of the CDP contract.
    Returns:
        str: Analysis results as a formatted string.
    """
  try:
    # Fetch the blog content
    url = f"https://aggregator.walrus-testnet.walrus.space/v1/{blob_id}"
    response = requests.get(url)
    response.raise_for_status()  # Raise an exception for HTTP errors

    blog_text = response.text  # Assuming the response contains the blog text

    # Calculate word count
    words = blog_text.split()
    word_count = len(words)

    # Estimate reading time (average 200 words per minute)
    estimated_reading_time = round(word_count / 200)

    # Calculate readability score (using Flesch Reading Ease)
    readability_score = flesch_reading_ease(blog_text)

    # Detect abusive words
    abusive_words_found = [
        word for word in ABUSIVE_WORDS
        if re.search(fr"\b{word}\b", blog_text, re.IGNORECASE)
    ]
    print(
        f"Word Count: {word_count}\n"
        f"Estimated Reading Time (minutes): {estimated_reading_time}\n"
        f"Readability Score: {readability_score}\n"
        f"Abusive Words Detected: {', '.join(abusive_words_found) if abusive_words_found else 'None'}"
    )
    # Return analysis as a formatted string

    contract = contract_address
    slug = "hellosdf"
    new_tags = ["science"]
    new_status = 2
    new_readability_score = readability_score
    new_estimated_read_time = estimated_reading_time

    invocation = agent_wallet.invoke_contract(contract_address=contract,
                                              method="updateBlogMeta",
                                              args={
                                                  "slug":
                                                  slug,
                                                  "newTags":
                                                  new_tags,
                                                  "newStatus":
                                                  new_status,
                                                  "newReadabilityScore":
                                                  new_readability_score,
                                                  "newEstimatedReadTime":
                                                  new_estimated_read_time
                                              },
                                              abi=blogAbi)
    # Wait for the transaction to complete
    print(invocation.method)
    print(invocation.transaction_hash)
    # tx_receipt = agent_wallet.wait_for_transaction_receipt(
    #     invocation.transaction_hash)2
    # print(tx_receipt)
    invocation.wait()
    return (
        f"Word Count: {word_count}\n"
        f"Estimated Reading Time (minutes): {estimated_reading_time}\n"
        f"Readability Score: {readability_score}\n"
        f"Abusive Words Detected: {', '.join(abusive_words_found) if abusive_words_found else 'None'}"
    )

  except requests.RequestException as req_err:
    return f"HTTP error occurred: {str(req_err)}"
  except Exception as e:
    return f"Unexpected error: {str(e)}"


# Initialize the agent
based_agent = Agent(
    name="Based Agent",
    instructions=
    ("An agent capable of analyzing blog content for reading time, content quality, "
     "and abusive words using the CDP AI Agent Kit."),
    functions=[analyze_blog_text],
)


def flesch_reading_ease(text: str) -> float:
  """
    Calculate the Flesch Reading Ease score manually.

    Args:
        text (str): The text to analyze

    Returns:
        float: The Flesch Reading Ease score
    """
  sentences = len(re.split(r'[.!?]', text)) - 1
  words = len(text.split())
  syllables = sum(count_syllables(word) for word in text.split())

  # Avoid division by zero
  if sentences == 0 or words == 0:
    return 0

  # Flesch Reading Ease formula
  score = 206.835 - 1.015 * (words / sentences) - 84.6 * (syllables / words)
  return round(score, 2)


def count_syllables(word: str) -> int:
  """
    Count the syllables in a word.

    Args:
        word (str): A single word

    Returns:
        int: Number of syllables in the word
    """
  word = word.lower()
  vowels = "aeiouy"
  count = 0
  prev_char_was_vowel = False

  for char in word:
    if char in vowels:
      if not prev_char_was_vowel:
        count += 1
      prev_char_was_vowel = True
    else:
      prev_char_was_vowel = False

  # Handle special cases
  if word.endswith("e"):
    count -= 1
  if count == 0:
    count += 1

  return count


blogAbi = [{
    "type":
    "constructor",
    "inputs": [{
        "name": "_userAddress",
        "type": "address",
        "internalType": "address"
    }, {
        "name": "_adminAddress",
        "type": "address",
        "internalType": "address"
    }, {
        "name": "_anonAadhaarVerifierAddr",
        "type": "address",
        "internalType": "address"
    }, {
        "name": "_agentAddress",
        "type": "address",
        "internalType": "address"
    }],
    "stateMutability":
    "nonpayable"
}, {
    "type":
    "function",
    "name":
    "addBlog",
    "inputs": [{
        "name": "slug",
        "type": "string",
        "internalType": "string"
    }, {
        "name": "blobId",
        "type": "string",
        "internalType": "string"
    }, {
        "name": "blobHash",
        "type": "string",
        "internalType": "string"
    }],
    "outputs": [],
    "stateMutability":
    "nonpayable"
}, {
    "type":
    "function",
    "name":
    "adminAddress",
    "inputs": [],
    "outputs": [{
        "name": "",
        "type": "address",
        "internalType": "address"
    }],
    "stateMutability":
    "view"
}, {
    "type":
    "function",
    "name":
    "agentAddress",
    "inputs": [],
    "outputs": [{
        "name": "",
        "type": "address",
        "internalType": "address"
    }],
    "stateMutability":
    "view"
}, {
    "type":
    "function",
    "name":
    "anonAadhaarVerifierAddr",
    "inputs": [],
    "outputs": [{
        "name": "",
        "type": "address",
        "internalType": "address"
    }],
    "stateMutability":
    "view"
}, {
    "type":
    "function",
    "name":
    "blogSlugs",
    "inputs": [{
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
    }],
    "outputs": [{
        "name": "",
        "type": "string",
        "internalType": "string"
    }],
    "stateMutability":
    "view"
}, {
    "type":
    "function",
    "name":
    "blogs",
    "inputs": [{
        "name": "",
        "type": "string",
        "internalType": "string"
    }],
    "outputs": [{
        "name": "blobId",
        "type": "string",
        "internalType": "string"
    }, {
        "name": "blobHash",
        "type": "string",
        "internalType": "string"
    }, {
        "name": "isPublished",
        "type": "bool",
        "internalType": "bool"
    }, {
        "name": "status",
        "type": "uint8",
        "internalType": "enum UserContract.BlogStatus"
    }, {
        "name": "readabilityScore",
        "type": "uint256",
        "internalType": "uint256"
    }, {
        "name": "estimatedReadTime",
        "type": "uint256",
        "internalType": "uint256"
    }],
    "stateMutability":
    "view"
}, {
    "type":
    "function",
    "name":
    "createdTimestamp",
    "inputs": [],
    "outputs": [{
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
    }],
    "stateMutability":
    "view"
}, {
    "type":
    "function",
    "name":
    "getAllBlogSlugs",
    "inputs": [],
    "outputs": [{
        "name": "",
        "type": "string[]",
        "internalType": "string[]"
    }],
    "stateMutability":
    "view"
}, {
    "type":
    "function",
    "name":
    "getBlogBySlug",
    "inputs": [{
        "name": "slug",
        "type": "string",
        "internalType": "string"
    }],
    "outputs": [{
        "name":
        "",
        "type":
        "tuple",
        "internalType":
        "struct UserContract.Blog",
        "components": [{
            "name": "blobId",
            "type": "string",
            "internalType": "string"
        }, {
            "name": "blobHash",
            "type": "string",
            "internalType": "string"
        }, {
            "name": "isPublished",
            "type": "bool",
            "internalType": "bool"
        }, {
            "name": "status",
            "type": "uint8",
            "internalType": "enum UserContract.BlogStatus"
        }, {
            "name": "readabilityScore",
            "type": "uint256",
            "internalType": "uint256"
        }, {
            "name": "estimatedReadTime",
            "type": "uint256",
            "internalType": "uint256"
        }, {
            "name": "tags",
            "type": "string[]",
            "internalType": "string[]"
        }]
    }],
    "stateMutability":
    "view"
}, {
    "type":
    "function",
    "name":
    "getUserVerificationTime",
    "inputs": [],
    "outputs": [{
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
    }],
    "stateMutability":
    "view"
}, {
    "type": "function",
    "name": "isAdult",
    "inputs": [],
    "outputs": [{
        "name": "",
        "type": "bool",
        "internalType": "bool"
    }],
    "stateMutability": "view"
}, {
    "type": "function",
    "name": "isUserAdult",
    "inputs": [],
    "outputs": [{
        "name": "",
        "type": "bool",
        "internalType": "bool"
    }],
    "stateMutability": "view"
}, {
    "type": "function",
    "name": "isUserVerified",
    "inputs": [],
    "outputs": [{
        "name": "",
        "type": "bool",
        "internalType": "bool"
    }],
    "stateMutability": "view"
}, {
    "type": "function",
    "name": "isVerified",
    "inputs": [],
    "outputs": [{
        "name": "",
        "type": "bool",
        "internalType": "bool"
    }],
    "stateMutability": "view"
}, {
    "type":
    "function",
    "name":
    "publishBlog",
    "inputs": [{
        "name": "slug",
        "type": "string",
        "internalType": "string"
    }],
    "outputs": [],
    "stateMutability":
    "nonpayable"
}, {
    "type":
    "function",
    "name":
    "updateAgentAddress",
    "inputs": [{
        "name": "newAgentAddress",
        "type": "address",
        "internalType": "address"
    }],
    "outputs": [],
    "stateMutability":
    "nonpayable"
}, {
    "type":
    "function",
    "name":
    "updateBlog",
    "inputs": [{
        "name": "slug",
        "type": "string",
        "internalType": "string"
    }, {
        "name": "newBlobHash",
        "type": "string",
        "internalType": "string"
    }, {
        "name": "newBlobId",
        "type": "string",
        "internalType": "string"
    }],
    "outputs": [],
    "stateMutability":
    "nonpayable"
}, {
    "type":
    "function",
    "name":
    "updateBlogMeta",
    "inputs": [{
        "name": "slug",
        "type": "string",
        "internalType": "string"
    }, {
        "name": "newTags",
        "type": "string[]",
        "internalType": "string[]"
    }, {
        "name": "newStatus",
        "type": "uint8",
        "internalType": "enum UserContract.BlogStatus"
    }, {
        "name": "newReadabilityScore",
        "type": "uint256",
        "internalType": "uint256"
    }, {
        "name": "newEstimatedReadTime",
        "type": "uint256",
        "internalType": "uint256"
    }],
    "outputs": [],
    "stateMutability":
    "nonpayable"
}, {
    "type":
    "function",
    "name":
    "userAddress",
    "inputs": [],
    "outputs": [{
        "name": "",
        "type": "address",
        "internalType": "address"
    }],
    "stateMutability":
    "view"
}, {
    "type":
    "function",
    "name":
    "userNullifier",
    "inputs": [],
    "outputs": [{
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
    }],
    "stateMutability":
    "view"
}, {
    "type":
    "function",
    "name":
    "verificationTimestamp",
    "inputs": [],
    "outputs": [{
        "name": "",
        "type": "uint256",
        "internalType": "uint256"
    }],
    "stateMutability":
    "view"
}, {
    "type":
    "function",
    "name":
    "verifyUserProof",
    "inputs": [{
        "name": "nullifierSeed",
        "type": "uint256",
        "internalType": "uint256"
    }, {
        "name": "nullifier",
        "type": "uint256",
        "internalType": "uint256"
    }, {
        "name": "timestamp",
        "type": "uint256",
        "internalType": "uint256"
    }, {
        "name": "revealArray",
        "type": "uint256[4]",
        "internalType": "uint256[4]"
    }, {
        "name": "groth16Proof",
        "type": "uint256[8]",
        "internalType": "uint256[8]"
    }],
    "outputs": [],
    "stateMutability":
    "nonpayable"
}, {
    "type":
    "event",
    "name":
    "BlogAdded",
    "inputs": [{
        "name": "user",
        "type": "address",
        "indexed": True,
        "internalType": "address"
    }, {
        "name": "slug",
        "type": "string",
        "indexed": False,
        "internalType": "string"
    }, {
        "name": "blobId",
        "type": "string",
        "indexed": False,
        "internalType": "string"
    }, {
        "name": "blobHash",
        "type": "string",
        "indexed": False,
        "internalType": "string"
    }, {
        "name": "timestamp",
        "type": "uint256",
        "indexed": False,
        "internalType": "uint256"
    }],
    "anonymous":
    False
}, {
    "type":
    "event",
    "name":
    "BlogPublished",
    "inputs": [{
        "name": "user",
        "type": "address",
        "indexed": True,
        "internalType": "address"
    }, {
        "name": "blobId",
        "type": "string",
        "indexed": False,
        "internalType": "string"
    }, {
        "name": "timestamp",
        "type": "uint256",
        "indexed": False,
        "internalType": "uint256"
    }],
    "anonymous":
    False
}, {
    "type":
    "event",
    "name":
    "BlogUpdated",
    "inputs": [{
        "name": "user",
        "type": "address",
        "indexed": True,
        "internalType": "address"
    }, {
        "name": "slug",
        "type": "string",
        "indexed": False,
        "internalType": "string"
    }, {
        "name": "newBlobHash",
        "type": "string",
        "indexed": False,
        "internalType": "string"
    }, {
        "name": "newBlobId",
        "type": "string",
        "indexed": False,
        "internalType": "string"
    }, {
        "name": "timestamp",
        "type": "uint256",
        "indexed": False,
        "internalType": "uint256"
    }],
    "anonymous":
    False
}, {
    "type":
    "event",
    "name":
    "UserVerified",
    "inputs": [{
        "name": "user",
        "type": "address",
        "indexed": True,
        "internalType": "address"
    }, {
        "name": "timestamp",
        "type": "uint256",
        "indexed": False,
        "internalType": "uint256"
    }, {
        "name": "isAdult",
        "type": "bool",
        "indexed": False,
        "internalType": "bool"
    }],
    "anonymous":
    False
}]
