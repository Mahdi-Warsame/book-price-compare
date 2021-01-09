import requests
from bs4 import BeautifulSoup


# 
AnotherURL = "https://isbnsearch.org/isbn/9780596007973"
URL = f"https://www.amazon.com/s?k=9781680501957"
HEADERS = { "User-Agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 11_0_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36"}

page = requests.get(AnotherURL,headers=HEADERS)
soup = BeautifulSoup(page.content,'html.parser')
print(soup)