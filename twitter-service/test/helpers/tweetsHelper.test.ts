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
    const index = TweetsHelper.generateRelevanceIndex(tweets[3], engagement)
    expect(engagement).toBe(25.75)
    expect(index).toBe(4)
  })

  it('should return text without urls', async () => {
    const data = TweetsHelper.extractText(tweets[2].full_text)
    expect(data).toBe('Olhem essas notícias ... interessantes...')
  })

  it('should return tweet url', async () => {
    const data = TweetsHelper.extractTweetUrl(tweets[3])
    expect(data).toBe('https://twitter.com/WIRED/status/1373980574151540740')
  })

  it('should return the useful data of the tweets', async () => {
    const data = TweetsHelper.usefulTweets(tweets, 25)
    expect(data).toEqual([{ name: 'vmotta8', relevanceIndex: 0, text: 'RT @ isso não pode', tweetUrl: 'https://twitter.com/vmotta8/status/1373991679250870273' }, { name: 'vmotta8', relevanceIndex: 0, text: 'Olha ', tweetUrl: 'https://twitter.com/vmotta8/status/1373991165956136965' }, { name: 'vmotta8', relevanceIndex: 0, text: 'Olhem essas notícias ... interessantes...', tweetUrl: 'https://twitter.com/vmotta8/status/1373321102265552898' }, { name: 'WIRED', relevanceIndex: 4.12, text: 'If we don’t deal with the implications of the coronavirus as a zoonotic infection, one that leaps between species, Covid is likely to be a threat to the human world for quite a long time. ', tweetUrl: 'https://twitter.com/WIRED/status/1373980574151540740' }])
  })
})
