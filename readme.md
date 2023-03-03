# smolplay

A small music player that can be used to share music online.

## Install Guide

1. Drop these files onto your public directory.

2. Copy `example_library.json` and rename `library.json`.

3. enter Title and Filename as a minimum for each track.

Supported fields are:

| field name  | example           | required |
| ----------- | ----------------- | -------- |
| title       | "Billie Jean"     | Yes      |
| filename    | "billie_jean.mp3" | Yes      |
| tags        | ["pop", "disco "] | No       |
| album       | "Thriller"        | No       |
| image       | "thriller.jpg"    | No       |

### Future Goals

- [ ] make a how to video about how to deploy and use
- [ ] fork this repo to make an ambient, looping soundboard
- [ ] have this read from a .json file that is build via a GUI backend
