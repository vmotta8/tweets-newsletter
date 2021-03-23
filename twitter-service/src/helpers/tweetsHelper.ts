/* eslint-disable array-callback-return */
import Twitter from 'twitter'

const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY || '',
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET || '',
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY || '',
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET || ''
})

export const TweetsHelper = {
  rtFilter (tweets: any): any {
    tweets = tweets.filter((tweet: any): any => {
      const text = tweet.full_text
      const mentions = text.slice(0, 4)
      const threads = text.slice(0, 1)

      if (mentions !== 'RT @' && threads !== '@') {
        return tweet
      }
    })

    return tweets
  },

  dateFilter (tweets: any): any {
    tweets = tweets.filter((tweet: any): any => {
      const date = new Date().getDate() - 3
      const tweetDate = parseInt(tweet.created_at.split(' ')[2])

      if (
        tweetDate === date
      ) {
        return tweet
      }

      // ["Mon Mar 22 13:35:18 +0000 2021", "Mon Mar 22 13:33:16 +0000 2021", "Sat Mar 21 17:10:40 +0000 2021", "Mon Mar 22 12:51:10 +0000 2021"]
      // [2021-03-22T14:04:02.930Z, 2021-03-22T14:04:02.930Z, 2021-03-22T14:04:02.930Z, 2021-03-22T14:04:02.930Z]
    })

    return tweets
  },

  sumTweets (tweets: any): number {
    return tweets.length
  },

  engagementAverage (tweets: any): number {
    const amount = tweets.length
    let usersEngagement = 0
    for (const tweet of tweets) {
      usersEngagement += tweet.retweet_count + tweet.favorite_count
    }

    return usersEngagement / amount
  },

  generateRelevanceIndex (
    tweet: any,
    engagementAverage: number
  ): any {
    const tweetEngagement = tweet.retweet_count + tweet.favorite_count

    const relevanceIndex = tweetEngagement / engagementAverage

    return relevanceIndex
  },

  extractText (text: string): string {
    let string = text.replace(/(https?|ftp):\/\/[.[a-zA-Z0-9/-]+/g, '')
    string = string.replace(/\s\s+/g, ' ')
    return string
  },

  extractTweetUrl (tweet: any): string {
    return `https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`
  },

  usefulTweets (tweets: any, engagement: number): any {
    const allUsefulTweets = []
    for (const tweet of tweets) {
      const usefulTweet = {
        name: tweet.user.name,
        relevanceIndex: this.generateRelevanceIndex(tweet, engagement),
        tweetUrl: this.extractTweetUrl(tweet),
        text: this.extractText(tweet.full_text)
      }

      allUsefulTweets.push(usefulTweet)
    }

    return allUsefulTweets
  },

  async collectTweets (user: string): Promise<any> {
    let tweets = await client.get('statuses/user_timeline', {
      screen_name: user,
      count: 200,
      tweet_mode: 'extended',
      include_entities: 1,
      include_extended_entities: 1
    })

    tweets = this.rtFilter(tweets)
    const engagement = this.engagementAverage(tweets)
    tweets = this.dateFilter(tweets)

    tweets = this.usefulTweets(tweets, engagement)

    return tweets
  },

  sortTweets (formatedTweets: any): any {
    formatedTweets.sort(
      (a: any, b: any) => parseFloat(b.relevanceIndex) - parseFloat(a.relevanceIndex)
    )
    formatedTweets = formatedTweets.slice(0, 10)

    return formatedTweets
  }
}
