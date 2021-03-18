/* eslint-disable array-callback-return */
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
        text: tweet.full_text
      }

      allUsefulTweets.push(usefulTweet)
    }

    return allUsefulTweets
  }
}
