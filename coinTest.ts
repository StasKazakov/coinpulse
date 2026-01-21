import { fetcher } from '@/lib/coingecko.actions'

const coin = await fetcher<CoinDetailsData>('/coins/bitcoin', {
    dex_pair_format: "symbol"
})

console.log(coin);