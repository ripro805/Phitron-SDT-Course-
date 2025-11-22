def main():
    a, b = map(int, input().split())
    s = input().strip()

    if len(s) != a + b + 1:
        print("No")
        return

    if s[a] != '-':
        print("No")
        return

    for i, ch in enumerate(s):
        if i == a:
            continue
        if not ch.isdigit():
            print("No")
            return

    print("Yes")

if __name__ == "__main__":
    main()
