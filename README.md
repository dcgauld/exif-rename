# exif-rename

A command to batch rename photos to their EXIF date. Supports JPEG and TIFF file types.

## Installation

```bash
npm i exif-rename -g
```

## Usage

```bash
exif-rename path/to/dir/*.jpg
```

### Options

* `--format`: Formats the EXIF date to "yyyy-mm-dd hh:mm:ss", instead of Unix time.
