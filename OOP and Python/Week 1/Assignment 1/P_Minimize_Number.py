def main():
    n = int(input())
    arr = list(map(int, input().split()))

    res = float('inf')

    for i in range(n):
        cnt = 0
        if arr[i] % 2 != 0:
            print(0)
            return

        while arr[i] % 2 == 0:
            cnt += 1
            arr[i] //= 2

        if i == 0 or cnt < res:
            res = cnt

    print(res)

if __name__ == "__main__":
    main()
