# exif-rename

A command to batch rename photos to their EXIF dates. Supports JPEG and TIFF file types.

## Installation

```bash
npm i exif-rename -g
```

## Usage

```bash
exif-rename path/to/dir/*.jpg
```

### Options

* `--format`: Format the EXIF dates to "yyyy-mm-dd hh:mm:ss", instead of Unix time.
