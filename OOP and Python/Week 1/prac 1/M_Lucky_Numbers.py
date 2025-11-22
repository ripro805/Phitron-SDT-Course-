def lucky_digit(digit):
    return digit == 4 or digit == 7

def is_lucky(n):
    while n > 0:
        last_digit = n % 10
        if not lucky_digit(last_digit):
            return False
        n //= 10
    return True

def main():
    a, b = map(int, input().split())
    found = False

    for i in range(a, b + 1):
        if is_lucky(i):
            print(i, end=" ")
            found = True

    if not found:
        print(-1)

if __name__ == "__main__":
    main()
