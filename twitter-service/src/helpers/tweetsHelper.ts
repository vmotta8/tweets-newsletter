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

      if (mentions !== 'RT @') {
        if (threads !== '@') {
          return tweet
        }
      }
    })

    return tweets
  },

  dateFilter (tweets: any): any {
    tweets = tweets.filter((tweet: any): any => {
      const dateNow = new Date().getDate()
      const dateYesterday = dateNow - 1
      const dateTomorrow = dateNow + 1

      const tweetDate = parseInt(tweet.created_at.split(' ')[2])

      if (
        tweetDate === dateNow ||
        tweetDate === dateYesterday ||
        tweetDate === dateTomorrow
      ) {
        return tweet
      }
    })

    return tweets
  },

  sumTweets (tweets: any): number {
    return Object.keys(tweets).length
  },

  sumEngagement (tweets: any): number {
    let usersEngagement = 0
    for (const tweet of tweets) {
      usersEngagement += tweet.retweet_count + tweet.favorite_count
    }

    return usersEngagement
  },

  generateRelevanceIndex (
    tweet: any,
    usersEngagement: number,
    usersAmountTweets: number
  ): any {
    const userAverageEngagement = usersEngagement / usersAmountTweets
    const tweetEngagement = tweet.retweet_count + tweet.favorite_count

    const relevanceIndex = tweetEngagement / userAverageEngagement

    return relevanceIndex
  },

  extractText (text: string): string {
    const aa = text.replace(/(https?|ftp):\/\/[.[a-zA-Z0-9/-]+/g, '')
    return aa
  },

  extractTweetUrl (tweet: any): string {
    return `https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`
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
    const amount = this.sumTweets(tweets)
    const engagement = this.sumEngagement(tweets)
    tweets = this.dateFilter(tweets)

    tweets = this.usefulTweets(tweets, engagement, amount)

    return tweets
  },

  sortTweets (formatedTweets: any): any {
    formatedTweets.sort(
      (a: any, b: any) => parseFloat(b.relevanceIndex) - parseFloat(a.relevanceIndex)
    )
    formatedTweets = formatedTweets.slice(0, 10)

    return formatedTweets
  },

  usefulTweets (
    tweets: any,
    engagement: number,
    amount: number
  ): any {
    const allUsefulTweets = []
    for (const tweet of tweets) {
      const usefulTweet = {
        name: tweet.user.name,
        relevanceIndex: this.generateRelevanceIndex(tweet, engagement, amount),
        tweetUrl: this.extractTweetUrl(tweet),
        text: this.extractText(tweet.full_text)
      }

      allUsefulTweets.push(usefulTweet)
    }

    return allUsefulTweets
  }
}
