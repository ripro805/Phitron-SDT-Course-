def main():
    n, q = map(int, input().split())
    v = [0] + list(map(int, input().split()))  # 1-based indexing

    pre = [0] * (n + 1)
    pre[1] = v[1]

    for i in range(2, n + 1):
        pre[i] = pre[i - 1] + v[i]

    for _ in range(q):
        l, r = map(int, input().split())
        if l == 1:
            total = pre[r]
        else:
            total = pre[r] - pre[l - 1]
        print(total)

if __name__ == "__main__":
    main()
