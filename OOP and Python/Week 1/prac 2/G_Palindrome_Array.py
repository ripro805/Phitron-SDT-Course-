def main():
    n = int(input())
    arr = list(map(int, input().split()))

    is_palindrome = True
    l, r = 0, n - 1

    while l < r:
        if arr[l] != arr[r]:
            is_palindrome = False
            break
        l += 1
        r -= 1

    if is_palindrome:
        print("YES")
    else:
        print("NO")

if __name__ == "__main__":
    main()
