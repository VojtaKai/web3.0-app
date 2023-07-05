import * as React from 'react'
import { getRandomFallbackGifUrl } from '../utils/gifUrls'

const API_KEY = import.meta.env.VITE_GIPHY_API_KEY

interface FetchProps {
    keyword: string
}

export const useFetch = (props: FetchProps) => {
    const { keyword } = props
    const [gifUrl, setGifUrl] = React.useState<string>('')

    if (!keyword) {
        setGifUrl(getRandomFallbackGifUrl())
    }
    
    React.useEffect(() => {
        const fetchGif = async () => {
            try {
                const response = await fetch(`http://api.giphy.com/v1/gifs/random?api_key=${encodeURIComponent(API_KEY)}&tag=${encodeURIComponent(keyword.split(" ").join(""))}`, {
                    method: 'GET'
                })
                console.log('response', response)
                const { data } = await response.json()
                console.log('data', data)
                console.log('url', data.url)
                if (!data?.images?.original?.url) {
                    throw new Error('Gif URL missing')
                }
                if (response.ok && response.status === 200) {
                    setGifUrl(data.images.original.url)
                }
            } catch {
                setGifUrl(getRandomFallbackGifUrl())
            }
        }

        fetchGif()
    }, [keyword])

    return gifUrl
}