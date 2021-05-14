/* eslint-disable array-callback-return */
import Twitter from 'twitter'
import createError from 'http-errors'
const keywordExtractor = require('keyword-extractor')
const stringSimilarity = require('string-similarity')

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
    const month = tweets[0].created_at.split(' ')[1]
    tweets = tweets.filter((tweet: any): any => {
      const date = new Date().getDate() - 3
      const tweetDate = parseInt(tweet.created_at.split(' ')[2])
      const tweetMonth = tweet.created_at.split(' ')[1]

      if (
        tweetDate >= date && month === tweetMonth
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
        text: this.extractText(tweet.full_text),
        date: tweet.created_at.split('+')[0]
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

    if (!tweets) {
      throw new createError.BadRequest('Tweets not found.')
    }

    tweets = this.rtFilter(tweets)
    const engagement = this.engagementAverage(tweets)
    tweets = this.dateFilter(tweets)

    tweets = this.usefulTweets(tweets, engagement)

    return tweets
  },

  sortTweets (formatedTweets: any, number: number): any {
    formatedTweets.sort(
      (a: any, b: any) => parseFloat(b.relevanceIndex) - parseFloat(a.relevanceIndex)
    )
    formatedTweets = formatedTweets.slice(0, number)

    return formatedTweets
  },

  removeRepeated (tweets: any): any {
    const result = tweets.reduce((unique: any, o: any) => {
      if (!unique.some((obj: any) => {
        let t1 = keywordExtractor.extract(obj.text)
        t1 = t1.join(' ')
        let t2 = keywordExtractor.extract(o.text)
        t2 = t2.join(' ')
        const similarity = stringSimilarity.compareTwoStrings(t1, t2)
        if (similarity >= 0.40) {
          return true
        }
        return false
      })) {
        unique.push(o)
      }
      return unique
    }, [])
    return result
  }
}
