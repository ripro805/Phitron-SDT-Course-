def main():
    s = input().strip()
    i = 0
    result = []

    while i < len(s):
        if s[i:i+5] == "EGYPT":
            result.append(" ")
            i += 5
        else:
            result.append(s[i])
            i += 1

    print("".join(result))

if __name__ == "__main__":
    main()
