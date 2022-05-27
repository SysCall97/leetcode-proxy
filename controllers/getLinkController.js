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
                link
            }
        }`;
    return {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: await JSON.stringify({ query: DAILY_CODING_CHALLENGE_QUERY }),
    };
}

const fetchDailyCodingChallenge = async () => {
    return new Promise(async function (resolve, reject) {
        const LEETCODE_API_ENDPOINT = 'https://leetcode.com/graphql';
        try {
            const init = await getInit();
            const response = await fetch(LEETCODE_API_ENDPOINT, init);
            data = await response.json();
            resolve(`https://leetcode.com${data.data.activeDailyCodingChallengeQuestion.link}`);
        } catch (error) {
            reject(error)
        }
      });
}

module.exports = getLinkController;