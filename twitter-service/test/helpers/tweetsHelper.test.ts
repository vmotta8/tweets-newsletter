import { TweetsHelper } from '../../src/helpers/tweetsHelper'
import { tweets } from './Tweets'

describe('tweets helper', () => {
  it('should remove tweets with rt', async () => {
    const data = TweetsHelper.rtFilter(tweets)
    expect(data.length).toBe(3)
  })

  it('should return tweets with right date', async () => {
    const data = TweetsHelper.dateFilter(tweets)
    expect(data.length).toBe(0)
  })

  it('should return tweets engagement and relevance index', async () => {
    const engagement = TweetsHelper.engagementAverage(tweets)
    const index = TweetsHelper.generateRelevanceIndex(tweets[2], engagement)
    expect(engagement).toBe(25.75)
    expect(index).toBe(4)
  })

  it('should return text without urls', async () => {
    const data = TweetsHelper.extractText(tweets[2].full_text)
    expect(data).toBe('If we don’t deal with the implications of the coronavirus as a zoonotic infection, one that leaps between species, Covid is likely to be a threat to the human world for quite a long time. ')
  })

  it('should return tweet url', async () => {
    const data = TweetsHelper.extractTweetUrl(tweets[2])
    expect(data).toBe('https://twitter.com/WIRED/status/1373980574151540740')
  })

  it('should return the useful data of the tweets', async () => {
    const data = TweetsHelper.usefulTweets(tweets, 25)
    expect(data).toEqual([{ date: 'Mon Mar 10 13:33:16 ', name: 'vmotta8', relevanceIndex: 0, text: 'Olha ', tweetUrl: 'https://twitter.com/vmotta8/status/1373991165956136965' }, { date: 'Sat Mar 10 17:10:40 ', name: 'vmotta8', relevanceIndex: 0, text: 'Olhem essas notícias ... interessantes...', tweetUrl: 'https://twitter.com/vmotta8/status/1373321102265552898' }, { date: 'Mon Mar 10 12:51:10 ', name: 'WIRED', relevanceIndex: 4.12, text: 'If we don’t deal with the implications of the coronavirus as a zoonotic infection, one that leaps between species, Covid is likely to be a threat to the human world for quite a long time. ', tweetUrl: 'https://twitter.com/WIRED/status/1373980574151540740' }, { date: 'Mon Feb 10 13:35:18 ', name: 'vmotta8', relevanceIndex: 0, text: 'RT @ isso não pode', tweetUrl: 'https://twitter.com/vmotta8/status/1373991679250870273' }])
  })
})
