def main():
    n = int(input())
    original = n
    reversed_num = 0

    while n > 0:
        last = n % 10
        reversed_num = reversed_num * 10 + last
        n //= 10

    print(reversed_num)

    if original == reversed_num:
        print("YES")
    else:
        print("NO")

if __name__ == "__main__":
    main()
