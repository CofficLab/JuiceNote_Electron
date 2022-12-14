from urllib.request import urlopen
text = urlopen('https://baidu.com').read().decode()
