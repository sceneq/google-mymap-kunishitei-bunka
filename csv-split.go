package main

import (
	"bufio"
	"encoding/csv"
	"flag"
	"fmt"
	"io"
	"log"
	"os"
	"path/filepath"
	"strings"
)

func main() {
	var inputFile string
	var outputDir string
	var linesPerFile int

	flag.StringVar(&inputFile, "input", "", "Input CSV file path (use '-' for stdin)")
	flag.StringVar(&outputDir, "output", ".", "Output directory for split CSV files")
	flag.IntVar(&linesPerFile, "lines", 0, "Number of lines per output file")
	flag.Parse()

	if outputDir == "" || linesPerFile == 0 {
		log.Fatal("Output directory (-output) and lines per file (-lines) are required.")
	}

	var rdr *csv.Reader
	var baseFilename string

	if inputFile == "-" || inputFile == "" {
		rdr = csv.NewReader(bufio.NewReader(os.Stdin))
		baseFilename = "stdin"
	} else {
		file, err := os.Open(inputFile)
		if err != nil {
			log.Fatal(err)
		}
		defer file.Close()
		rdr = csv.NewReader(file)
		baseFilename = strings.TrimSuffix(filepath.Base(inputFile), filepath.Ext(inputFile))
	}

	header, err := rdr.Read()
	if err == io.EOF {
		return
	}
	if err != nil {
		log.Fatal(err)
	}

	var records [][]string
	fileCounter := 1

	for {
		record, err := rdr.Read()
		if err == io.EOF {
			break
		}
		if err != nil {
			log.Fatal(err)
		}

		records = append(records, record)

		if len(records) == linesPerFile {
			writeCSV(header, records, outputDir, baseFilename, fileCounter)
			records = nil
			fileCounter++
		}
	}

	if len(records) > 0 {
		writeCSV(header, records, outputDir, baseFilename, fileCounter)
	}
}

func writeCSV(header []string, records [][]string, outputDir, baseFilename string, fileCounter int) {
	outputPath := filepath.Join(outputDir, fmt.Sprintf("%s_%d.csv", baseFilename, fileCounter))
	outputFile, err := os.Create(outputPath)
	if err != nil {
		log.Fatal(err)
	}
	defer outputFile.Close()

	wtr := csv.NewWriter(outputFile)
	defer wtr.Flush()

	wtr.Write(header)

	for _, record := range records {
		if err := wtr.Write(record); err != nil {
			log.Fatal(err)
		}
	}
}
