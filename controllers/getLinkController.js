const fetch = require('node-fetch');
const getLinkController = {};

getLinkController.getLink = async (req, res) => {
    try {
        const link = await fetchDailyCodingChallenge();
        return res.status(200).json({ link });
    } catch (e) {
        return res.status(500).json({ message: e });
    }
}

const getInit = async () => {
    const DAILY_CODING_CHALLENGE_QUERY = `
        query questionOfToday {
            activeDailyCodingChallengeQuestion {
                date
                userStatus
                link
                question {
                    acRate
                    difficulty
                    freqBar
                    frontendQuestionId: questionFrontendId
                    isFavor
                    paidOnly: isPaidOnly
                    status
                    title
                    titleSlug
                    hasVideoSolution
                    hasSolution
                    topicTags {
                        name
                        id
                        slug
                    }
                }
            }
        }`;
    return {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: await JSON.stringify({ query: DAILY_CODING_CHALLENGE_QUERY }),
    };
}

const fetchDailyCodingChallenge = async () => {
    return new Promise(async function (reject, resolve) {
        const LEETCODE_API_ENDPOINT = 'https://leetcode.com/graphql';
        const init = await getInit();
        fetch(LEETCODE_API_ENDPOINT, init)
        .then(response => response.json())
        .then(data => resolve(`https://leetcode.com${data.data.activeDailyCodingChallengeQuestion.link}`))
        .catch(err => reject(err));
      });
}

module.exports = getLinkController;