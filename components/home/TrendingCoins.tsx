import { fetcher } from '@/lib/coingecko.actions'
import Link from 'next/link'
import Image from 'next/image'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import DataTable from '@/components/DataTable';

const TrendingCoins = async () => {
    const trendingCoins = await fetcher<{ 
        coins: TrendingCoin[] 
    }>('/search/trending', undefined, 300)

    const columns: DataTableColumn<TrendingCoin>[] = [
    { 
        header: "Name", 
        cellClassName: "name-cell", 
        cell: (coin) =>  {
        const item = coin.item;
        return (
            <Link href={`/coins/${item.id}`}>
            <Image src={item.large} alt={item.name} width={36} height={36} />
            <p>{item.name}</p>
            </Link>
        )
        },
    },
        {
        header: '24h Change',
        cellClassName: "change-cell",
        cell: (coin) => {
            const item = coin.item;
            const isTrendingUp = item.data.price_change_percentage_24h.usd > 0
            return (
            <div className={cn("price-change", isTrendingUp ? "text-green-500" : "text-red-500")}>
                <p>
                {isTrendingUp ? (
                    <TrendingUp width={16} height={16}/>
                ) : (
                    <TrendingDown width={16} height={16}/>)}
                </p>
            </div>
            )
        }
        },
        { header: "Price", cellClassName: "price-cell", cell: (coin) => coin.item.data.price },
    ]
  return (
    <div id='trending-coins'>
    <p>Trending Coins</p>
    <div id='trending-coins'>
        <DataTable
        data={trendingCoins.coins.slice(0, 6) || []} 
        columns={columns}
        rowKey={(coin) => coin.item.id}
        tableClassName="trending-coins-table"/>
    </div>
    </div>
  )
}

export default TrendingCoins