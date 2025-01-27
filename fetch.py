import requests
from bs4 import BeautifulSoup
import os

def download_images():
    url = "https://moutamadris.ma/calendrier-vacances-scolaires-universitaires-ofppt-maroc/"
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }

    # Create directory if it doesn't exist
    if not os.path.exists('downloaded_images'):
        os.makedirs('downloaded_images')

    # Fetch the webpage
    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.content, 'html.parser')

    # Extract school year from title or content
    school_year = ''
    title = soup.find('h1', class_='entry-title')
    if title and '2024-2025' in title.text:
        school_year = '2024-2025'

    # Find the site-content div
    site_content = soup.find('div', class_='site-content')
    
    # Define the image identifiers and their names
    calendar_images = {
        'vacance-scolaire': f'Calendrier_Scolaire_{school_year}',
        'عطل-التكوين-المهني': f'Calendrier_OFPPT_{school_year}',
        'العطل-الجامعية': f'Calendrier_Universitaire_{school_year}'
    }

    if site_content:
        images = site_content.find_all('img')
        for img in images:
            img_url = img.get('src')
            if img_url:
                # Check if the image URL contains any of our target keywords
                for keyword, filename in calendar_images.items():
                    if keyword in img_url:
                        try:
                            img_response = requests.get(img_url, headers=headers)
                            if img_response.status_code == 200:
                                # Extract file extension from URL
                                file_extension = os.path.splitext(img_url)[1] or '.webp'
                                # Save the image with the specific name
                                filepath = f'downloaded_images/{filename}{file_extension}'
                                with open(filepath, 'wb') as f:
                                    f.write(img_response.content)
                                print(f'Downloaded {filename}')
                        except Exception as e:
                            print(f'Error downloading {filename}: {e}')

if __name__ == "__main__":
    download_images()
