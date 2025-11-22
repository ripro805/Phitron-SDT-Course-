def main():
    n = int(input())
    s = input().strip()

    total = 0
    for ch in s:
        total += int(ch)

    print(total)

if __name__ == "__main__":
    main()
