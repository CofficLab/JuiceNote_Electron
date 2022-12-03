def x(a,b,c):
    r = a+b-c 
    print(r)


def isRun(year):
    if year % 400 == 0:
        print(str(year) + '是闰年')
    elif year % 4 == 0 and year % 100 != 0:
        print(str(year) + '是闰年')
    else:
        print(str(year) + '不是闰年')

def matrix(x,y):
    for i in range(x):
        for j in range(y):
            print(str(i) + '--' + str(j))
    
isRun(1900)