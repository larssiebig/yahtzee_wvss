interface Category {
    title: string,
    description: string,
    id: string
}

const upperSectionCategories: Category[] = [
    { title: "Ones", description: "Sum of ones.", id: "ones" },
    { title: "Twos", description: "Sum of twos.", id: "twos" },
    { title: "Threes", description: "Sum of threes.", id: "threes" },
    { title: "Fours", description: "Sum of fours.", id: "fours" },
    { title: "Fives", description: "Sum of fives.", id: "fives" },
    { title: "Sixes", description: "Sum of sixes.", id: "sixes" },
]

const lowerSectionCategories: Category[] = [
    { title: "Three of a kind", description: "Sum of all dice.", id: "three-of-a-kind" },
    { title: "Four of a kind", description: "Sum of all dice.", id: "four-of-a-kind" },
    { title: "Full house", description: "25 points", id: "full-house" },
    { title: "Small straight", description: "30 points", id: "small-straight" },
    { title: "Large straight", description: "40 points", id: "large-straight" },
    { title: "Yahtzee", description: "50 points + 100 per extra.", id: "yahtzee" },
    { title: "Chance", description: "Sum of all dice.", id: "chance" },
]

const yahtzeeCategories: Category[] = [...upperSectionCategories, ...lowerSectionCategories];

export { yahtzeeCategories, upperSectionCategories, lowerSectionCategories };
