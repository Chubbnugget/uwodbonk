// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // This is your main sidebar that will show up for your docs
  QuestSidebar: [
    // --- QUESTS SECTION ---
    {
      type: 'category',
      label: 'Quests',
      collapsed: false,
      items: [
        { type: 'doc', id: 'Quests/AdventureQuest', label: 'Adventure' },
        { type: 'doc', id: 'Quests/TradeQuest', label: 'Trade' },
        { type: 'doc', id: 'Quests/BattleQuest', label: 'Battle' },
        { type: 'doc', id: 'Quests/MapIndex', label: 'Maps' },
      ],
    },
  ],
  TradeGoodSidebar: [
    // --- TRADE GOODS SECTION ---
    {
      type: 'category',
      label: 'Trade Goods',
      items: [
        { type: 'doc', id: 'Categories/1', label: 'Fibers' },
        { type: 'doc', id: 'Categories/2', label: 'Dye' },
        { type: 'doc', id: 'Categories/3', label: 'Foodstuffs' },
        { type: 'doc', id: 'Categories/4', label: 'Seasonings' },
        { type: 'doc', id: 'Categories/5', label: 'Misc' },
        { type: 'doc', id: 'Categories/6', label: 'Medicine' },
        { type: 'doc', id: 'Categories/7', label: 'Minerals' },
        { type: 'doc', id: 'Categories/8', label: 'Metals' },
        { type: 'doc', id: 'Categories/9', label: 'Alcohol' },
        { type: 'doc', id: 'Categories/10', label: 'Sunddries' },
        { type: 'doc', id: 'Categories/11', label: 'Perfume' },
        { type: 'doc', id: 'Categories/12', label: 'Spices' },
        { type: 'doc', id: 'Categories/13', label: 'Luxuries' },
        { type: 'doc', id: 'Categories/14', label: 'Art' },
        { type: 'doc', id: 'Categories/15', label: 'Gems' },
        { type: 'doc', id: 'Categories/16', label: 'Weapons' },
        { type: 'doc', id: 'Categories/17', label: 'Firearms' },
        { type: 'doc', id: 'Categories/18', label: 'Livestock' },
        { type: 'doc', id: 'Categories/19', label: 'Wares' },
        { type: 'doc', id: 'Categories/20', label: 'Fabrics' },
      ],
    },
  ],
  SkillSidebar: [
    // --- SKILLS SECTION (Your original code) ---
    {
      type: 'category',
      label: 'Skills',
      items: [
        {
          type: 'category',
          label: 'Adventure Skills',
          link: { type: 'doc', id: 'Categories/39' },
          items: [{ type: 'doc', id: 'Categories/39', label: 'Adventure Skills' }], 
        },
        {
          type: 'category',
          label: 'Trade Skills',
          link: { type: 'doc', id: 'Categories/40' },
          items: [{ type: 'doc', id: 'Categories/40', label: 'Trade Skills' }],
        },
        {
          type: 'category',
          label: 'Battle Skills',
          link: { type: 'doc', id: 'Categories/41' },
          items: [{ type: 'doc', id: 'Categories/41', label: 'Battle Skills' }],
        },
      ],
    },
  ],
};

export default sidebars;