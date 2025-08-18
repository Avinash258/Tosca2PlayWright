import os
import gzip
import json

def process_tsu(tsu_file, output_folder):
    # Ensure the file exists
    if not os.path.isfile(tsu_file):
        print(f"Error: File '{tsu_file}' not found.")
        return
    
    # Create output folder if it doesn't exist
    os.makedirs(output_folder, exist_ok=True)

    try:
        # Read the gzipped content
        with open(tsu_file, 'rb') as f:
            with gzip.GzipFile(fileobj=f) as gz:
                content = gz.read().decode('utf-8', errors='replace')
        
        # Parse JSON content
        json_data = json.loads(content)
        
        # Save as formatted JSON first (easier to read and process)
        json_output = os.path.join(output_folder, "tosca_content.json")
        with open(json_output, 'w', encoding='utf-8') as f:
            json.dump(json_data, f, indent=2)
        
        print(f"Successfully extracted content to JSON:")
        print(f"Output file: {json_output}")
        
        # Print the first bit of content for verification
        print("\nFirst 500 characters of the content:")
        print(content[:500])
        
    except gzip.BadGzipFile:
        print("Error: This file is not a valid gzipped file.")
    except json.JSONDecodeError as e:
        print(f"Error: Could not parse JSON content: {str(e)}")
        print("\nFirst 200 characters of content:")
        if 'content' in locals():
            print(content[:200])
    except Exception as e:
        print(f"Error during processing: {str(e)}")

if __name__ == "__main__":
    tsu_path = "avi.tsu"
    output_path = "extracted_tosca_files"
    process_tsu(tsu_path, output_path)
