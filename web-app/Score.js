/**
 * @namespace Score
 * @author A. Freddie Page
 * @version 2022.23
 * This module provides the scoring system for a Tetris Game.
 */
const Score = {};

/**
 * The score object contains information about the score of the game.
 * Currently it is implemented as a single number,
 * but could include other information such as the number of lines cleared.
 * @typedef {Object} Score
 * @property {number} score
 * @property {number} lines_cleared
 * @property {boolean} last_cleared_tetris if the last line cleared was a tetris
 * @memberof Score
 */

/**
 * To generate a new score object before the game starts.
 * @function
 * @memberof Score
 * @returns {Score.Score} The new game score object.
 */
Score.new_score = function () {
    return {
        score: 0,
        lines_cleared: 0,
        last_cleared_tetris: false
    };
};

/**
 * @function
 * @memberof Score
 * @param {Score.Score} score The game score.
 * @returns {number} The game level you are on.
 */
Score.level = function (score) {
    return Math.floor(score.lines_cleared / 10) + 1;
};

/**
 * Create a new `Score` with additional lines cleared and the score updated
 * @function
 * @memberof Score
 * @param {number} numOfLines The total number of lines cleared.
 * @param {Score.Score} score The game score.
 * @returns {Score.Score} The new game score object.
 */
Score.cleared_lines = function(numOfLines, score) {
    let newLinesCleared = score.lines_cleared + numOfLines;
    let currentScore = 0;
    if (numOfLines === 1) {
        currentScore = 100;
    } else if (numOfLines === 2) {
        currentScore = 300;
    } else if (numOfLines === 3) {
        currentScore = 500;
    } else if (numOfLines === 4) {
        if (score.last_cleared_tetris) {
            currentScore = 1200;
        } else {
            currentScore = 800;
        }
    }
    let newScore = score.score + currentScore * Score.level(score);
    return {
        score: newScore,
        lines_cleared: newLinesCleared,
        last_cleared_tetris: numOfLines === 4
    };
}

/**
 * Add a given number of points to a given score
 * @function
 * @memberof Score
 * @param {number} points The added points.
 * @param {Score.Score} score The game score.
 * @returns {Score.Score} The new game score object.
 */
Score.add_points = function(points, score) {
    const newScore = score.score + points;
    return {
        score: newScore,
        lines_cleared: score.lines_cleared,
        last_cleared_tetris: score.last_cleared_tetris
    }
}

export default Object.freeze(Score);
