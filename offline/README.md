# Concatenated Simple Encryption

If you don't want to memorize your 128 random character password you can encrypt it using concatenated simple encryption.

Make sure to only have your 


| Char 1 | Char 2 | Char 3

## .cse files


## Problem
- When a character isn't hex you know that it has to have been changed. You can guess the length of the input.
- If the value isn't that long most of the sha256 hash is exposed.
  - You can brute force attack and if the begging of the hash matches you can guess the value through decrypting the simple encryption.