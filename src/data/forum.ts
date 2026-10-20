export interface ForumComment {
  author: string;
  age: string;
  score: number;
  body: string;
  replies?: ForumComment[];
}

export interface ForumPost {
  slug: string;
  category: string;
  categoryTone: 'purple' | 'blue' | 'green' | 'orange';
  title: string;
  excerpt: string;
  author: string;
  age: string;
  commentsCount: number;
  upvotes: number;
  flair?: string;
  body: string[];
  comments: ForumComment[];
  sourceTitle?: string;
  sourcePath?: string;
}

export const forumCategories = [
  { name: 'General', tone: 'purple', icon: 'users' },
  { name: 'Guides & Builds', tone: 'blue', icon: 'navBlog' },
  { name: 'Patch Talk', tone: 'orange', icon: 'refresh' },
  { name: 'Community', tone: 'green', icon: 'messageCircle' },
] as const;

function guideDiscussion(input: {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categoryTone: ForumPost['categoryTone'];
  sourceTitle: string;
  sourcePath: string;
  upvotes: number;
  answer: string;
  detail: string;
  tip: string;
}): ForumPost {
  const { answer, detail, tip, ...post } = input;
  return {
    ...post,
    author: 'guide_team',
    age: '2 days ago',
    commentsCount: 1,
    upvotes: 14,
    flair: 'Guide Q&A',
    body: [answer, detail],
    comments: [{ author: 'guide_team', age: 'From the guide', score: 0, body: tip }],
  };
}

const additionalGuidePosts: ForumPost[] = [
  guideDiscussion({
    slug: 'what-does-enlisted-map-awareness-include', title: 'What does map awareness include in the guide?', upvotes: 73,
    excerpt: 'A quick breakdown of player, chest, loot, and smoke information covered by the map awareness guide.',
    category: 'Guides & Builds', categoryTone: 'blue', sourceTitle: 'Enlisted ESP wallhack setup guide', sourcePath: '/blog/enlisted-esp-wallhack-setup/',
    answer: 'The guide covers player ESP, chest and reboot markers, loot information, smoke alerts, and last-seen positions. The exact options depend on the selected product tier.',
    detail: 'It recommends starting with a restrained layout and enabling only the information you can read comfortably during a team fight.',
    tip: 'Keep the overlay uncluttered: begin with the core indicators, then adjust the range and visibility settings one at a time.',
  }),
  guideDiscussion({
    slug: 'how-to-set-up-map-overlay', title: 'How should I set up the map overlay for the first time?', upvotes: 58,
    excerpt: 'Start with the basic display options, confirm the overlay in a practice session, then adjust one setting at a time.',
    category: 'Guides & Builds', categoryTone: 'blue', sourceTitle: 'Enlisted ESP wallhack setup guide', sourcePath: '/blog/enlisted-esp-wallhack-setup/',
    answer: 'Use the setup guide to enable the overlay, choose readable colors, and check that the indicators do not cover important parts of the game interface.',
    detail: 'Test your layout in a bot lobby before relying on it in a live match. A simple configuration is easier to understand than turning on every option immediately.',
    tip: 'If the screen feels crowded, reduce the number of indicators before changing their size or position.',
  }),
  guideDiscussion({
    slug: 'what-zoom-settings-are-comfortable', title: 'What camera zoom settings are comfortable to play with?', upvotes: 44,
    excerpt: 'The zoom guide focuses on finding a view that improves map context without making your player hard to control.',
    category: 'Guides & Builds', categoryTone: 'blue', sourceTitle: 'Enlisted radar hack guide', sourcePath: '/blog/enlisted-radar-hack-guide/',
    answer: 'There is no single ideal zoom value for every player. The guide recommends adjusting gradually and checking that you can still track your player, spell ranges, and nearby fights.',
    detail: 'Keep a quick reset to the default camera view available so you can compare the wider view and return to familiar framing.',
    tip: 'Change one step at a time and play a short practice session before settling on a new camera distance.',
  }),
  guideDiscussion({
    slug: 'how-to-tune-script-delay-settings', title: 'How do delay settings affect player aimbot?', upvotes: 32,
    excerpt: 'A practical question about timing, combo readability, and why the aimbot guide recommends conservative tuning.',
    category: 'Guides & Builds', categoryTone: 'blue', sourceTitle: 'Enlisted aimbot for ranked play', sourcePath: '/blog/enlisted-aimbot-ranked-guide/',
    answer: 'Delay settings control the spacing between automated actions. The guide recommends starting with slower timings and testing them in a practice setting before making changes.',
    detail: 'A consistent sequence is easier to review and tune than changing several timing values at once.',
    tip: 'Keep a note of each configuration you try so you can return to the last setup that behaved as expected.',
  }),
  guideDiscussion({
    slug: 'how-to-practice-auto-combos', title: 'What is a good way to practice an aimbot?', upvotes: 29,
    excerpt: 'Use a repeatable player setup, learn the sequence, and check each spell and item timing in a controlled lobby.',
    category: 'Guides & Builds', categoryTone: 'blue', sourceTitle: 'Enlisted aimbot player aimbot', sourcePath: '/blog/enlisted-aimbot-combat-guide/',
    answer: 'Choose one player and one combo to practice at a time. The guide walks through example sequences and explains how target selection and ability order fit together.',
    detail: 'A custom lobby lets you repeat the sequence and see which steps need adjustment without the pressure of a live match.',
    tip: 'Learn the manual sequence first; that makes it much easier to spot when a configuration is mistimed.',
  }),
  guideDiscussion({
    slug: 'what-is-in-the-elite-tier', title: 'What additional tools are included in the Elite tier?', upvotes: 67,
    excerpt: 'The Elite guide explains how its extra utility modules compare with the Lite and Pro feature sets.',
    category: 'General', categoryTone: 'purple', sourceTitle: 'Enlisted Elite tier guide', sourcePath: '/blog/enlisted-elite-tier-guide/',
    answer: 'The guide describes Elite as including the Lite and Pro feature sets plus additional utilities such as Loot Assist, Auto Finish, Auto suppression break, and Uniform changer.',
    detail: 'It also covers who may benefit from the extra modules and why it makes sense to understand the simpler feature set first.',
    tip: 'Compare the included features against your needs before choosing a tier; the full comparison is linked in the guide.',
  }),
  guideDiscussion({
    slug: 'how-do-lite-and-pro-differ', title: 'How do Lite and Pro differ in practice?', upvotes: 53,
    excerpt: 'Lite centers on awareness features, while Pro adds player script tools; here is the short version.',
    category: 'General', categoryTone: 'purple', sourceTitle: 'Enlisted Lite vs Pro: which tier fits you', sourcePath: '/blog/enlisted-lite-vs-pro/',
    answer: 'The comparison guide describes Lite as focused on awareness tools such as ESP, chest and loot information, and zoom. Pro adds aimbot automation features on top of that foundation.',
    detail: 'The right choice depends on whether you need map information alone or also want the additional script modules described in the comparison.',
    tip: 'Use the full side-by-side comparison to check specific modules before making a decision.',
  }),
  guideDiscussion({
    slug: 'what-to-know-about-skin-changer', title: 'What should I know about the Uniform changer utility?', upvotes: 38,
    excerpt: 'The product guide explains how cosmetic previews work and what to expect from the utility.',
    category: 'General', categoryTone: 'purple', sourceTitle: 'Enlisted Uniform changer guide', sourcePath: '/blog/enlisted-skin-changer-guide/',
    answer: 'The guide describes Uniform changer as a local cosmetic preview utility. It explains setup, supported options, and how to restore the default appearance.',
    detail: 'Review the compatibility notes and follow the current setup instructions before using the utility.',
    tip: 'Cosmetic changes are local previews; check the guide for current limitations and setup steps.',
  }),
  guideDiscussion({
    slug: 'what-to-do-if-eac-cannot-verify', title: 'What should I do if BattlEye cannot verify my Enlisted install?', upvotes: 24,
    excerpt: 'Start with Gaijin file verification and a clean restart before assuming the issue is an account restriction.',
    category: 'Patch Talk', categoryTone: 'orange', sourceTitle: 'BattlEye unable to verify Enlisted', sourcePath: '/blog/eac-bypass-enlisted-guide/',
    answer: 'The troubleshooting guide says the message can result from game-file problems or software conflicts and does not always mean an account ban. First verify Enlisted files through Gaijin.',
    detail: 'It also recommends fully exiting the Gaijin Launcher, restarting the PC, and checking for conflicting overlays before trying more disruptive steps.',
    tip: 'Test a normal Gaijin launch before starting other software so you can narrow down the cause.',
  }),
  guideDiscussion({
    slug: 'how-does-an-external-loader-work', title: 'What does “external loader” mean?', upvotes: 46,
    excerpt: 'The external software guide explains the term and outlines the general setup described on the site.',
    category: 'General', categoryTone: 'purple', sourceTitle: 'Enlisted external hack guide', sourcePath: '/blog/enlisted-external-cheat-guide/',
    answer: 'The article uses “external” to describe software that runs separately from the Enlisted process and presents its interface as an overlay.',
    detail: 'It discusses the architecture at a high level and explains setup, patch updates, and the differences described between external and internal tools.',
    tip: 'Check compatibility and current status information whenever Enlisted receives an update.',
  }),
  guideDiscussion({
    slug: 'how-to-check-stream-proof-capture', title: 'How can I check whether OBS captures an overlay?', upvotes: 21,
    excerpt: 'The stream-proof setup guide recommends recording a short test and checking the playback before streaming.',
    category: 'Guides & Builds', categoryTone: 'blue', sourceTitle: 'Stream-proof overlay setup for Enlisted', sourcePath: '/blog/enlisted-stream-proof-setup/',
    answer: 'Record a short local test with the exact OBS scene and capture mode you plan to use, then review the playback for any overlay elements.',
    detail: 'The guide recommends testing game capture and display capture separately, since capture methods and multi-monitor setups can behave differently.',
    tip: 'Do not rely on the preview alone; review a saved recording from the same scene you intend to stream.',
  }),
  guideDiscussion({
    slug: 'what-to-do-after-hwid-change', title: 'What should I check after changing PCs or hardware?', upvotes: 33,
    excerpt: 'The HWID guide covers common setup checks and when to contact support for an account or device reset.',
    category: 'General', categoryTone: 'purple', sourceTitle: 'Enlisted HWID spoofer after ban', sourcePath: '/blog/enlisted-hwid-spoofer-after-ban/',
    answer: 'Start by checking the account and device instructions for your product. The guide explains common HWID questions and when a reset request may be needed.',
    detail: 'Avoid changing several system settings at once. If the product does not recognize your device, contact support with the relevant error details.',
    tip: 'Use the official support path for device resets instead of relying on unrelated third-party tools.',
  }),
  guideDiscussion({
    slug: 'what-to-check-before-installing-tools', title: 'What should I review before installing a new tool?', upvotes: 18,
    excerpt: 'Check the official setup steps, current compatibility notes, and support information before proceeding.',
    category: 'Community', categoryTone: 'green', sourceTitle: 'Enlisted Hacks features guide', sourcePath: '/blog/enlisted-cheats-features-guide/',
    answer: 'Read the feature and setup information first, confirm that it matches your system, and check the current update/status notes.',
    detail: 'The site guide describes the available feature groups and links to more specific setup articles for individual modules.',
    tip: 'Use the linked product and support pages as the source of truth for current availability and compatibility.',
  }),
  guideDiscussion({
    slug: 'how-to-choose-enlisted-2-product-tier', title: 'How do I choose the right Enlisted product tier?', upvotes: 48,
    excerpt: 'Compare the feature sets first, then follow the official checkout and setup instructions for your selection.',
    category: 'Community', categoryTone: 'green', sourceTitle: 'How to buy Enlisted Hacks in 2026', sourcePath: '/blog/how-to-buy-enlisted-cheats-2026/',
    answer: 'The buying guide recommends comparing included features and choosing the tier that fits your needs before continuing through the official checkout.',
    detail: 'It covers the purchase flow, account access, downloading the current build, and checking setup instructions before launching.',
    tip: 'If you have a payment or account question, use the site support page and avoid sharing purchase details publicly.',
  }),
];

export const forumPosts: ForumPost[] = [
  {
    slug: 'can-custom-lobby-cheat-codes-be-used-in-ranked', category: 'General', categoryTone: 'purple',
    title: 'Can I use Enlisted hack tools in ranked matchmaking?',
    excerpt: 'Quick answer from the practice lobby guide: built-in lobby commands only work in custom matches with hacks enabled.',
    author: 'guide_team', age: '2 hours ago', commentsCount: 3, upvotes: 128, flair: 'Guide Q&A',
    sourceTitle: 'Enlisted hack tools guide: console commands for practice lobbies', sourcePath: '/blog/enlisted-cheat-codes-guide/',
    body: ['No. custom battle maps and training lobbies are for practice only. They do not carry into Ranked matchmaking or Combined arms.', 'Use Custom battles to learn aimbot smoothness, ESP ranges, and loadouts. The guide also explains the difference between practice drills and third-party Enlisted Hacks.'],
    comments: [
      { author: 'mid_or_feed', age: '1 hour ago', score: 24, body: 'Correct: load a Custom battles aim map or bot lobby before touching Ranked presets.' },
      { author: 'ancient_archivist', age: '48 min. ago', score: 11, body: 'The guide covers AR, SMG, and shotgun drills. Keep Ranked presets conservative after practice.' },
      { author: 'push_first', age: '35 min. ago', score: 8, body: 'Useful distinction. Custom battle practice tools are not ranked features.' },
    ],
  },
  {
    slug: 'how-to-enable-the-enlisted-2-console', category: 'General', categoryTone: 'purple',
    title: 'How do I turn on the Enlisted developer console?',
    excerpt: 'Open Settings → Options → Advanced and enable the console. Here is the quick setup from our walkthrough.',
    author: 'guide_team', age: '4 hours ago', commentsCount: 2, upvotes: 86, flair: 'Guide Q&A',
    sourceTitle: 'How to use hack tools in Enlisted', sourcePath: '/blog/how-to-use-enlisted-cheat-codes/',
    body: ['Open Settings, choose Options, then open Advanced Options and enable the developer console. In a custom lobby, press the console key (usually tilde) and enter the command. You also need the host to enable hacks in the lobby settings.', 'If a command does nothing, first confirm hacks are enabled for that lobby and check the command syntax.'],
    comments: [
      { author: 'pos4_roamer', age: '3 hours ago', score: 17, body: 'You can also bind the console key in the hotkey settings if tilde is unavailable on your keyboard layout.' },
      { author: 'carry_curious', age: '2 hours ago', score: 9, body: 'Commands need the right lobby permissions; spectators may not be able to use economy commands.' },
    ],
  },
  {
    slug: 'practice-enlisted-high-ground-safely', category: 'Guides & Builds', categoryTone: 'blue',
    title: 'What is the safest way to practice high-ground spots?',
    excerpt: 'Use Custom battles or a bot lobby with ESP to study sight lines, then fight without staring at overlays.',
    author: 'guide_team', age: '6 hours ago', commentsCount: 2, upvotes: 64, flair: 'Guide Q&A',
    sourceTitle: 'Enlisted Custom battles tips for aimbot and ESP practice', sourcePath: '/blog/enlisted-console-cheats-tips/',
    body: ['Practice in Custom battles or a bot lobby. Enable ESP boxes briefly to inspect high-ground angles and chest positions, then fight with overlays minimized.', 'Repeat the same POI clear a few times so sight lines stick without waiting for a full Ranked match.'],
    comments: [
      { author: 'stack_and_pull', age: '5 hours ago', score: 13, body: 'I peek with ESP on, then disable boxes and re-check the same angle. Helps for high-ground coverage.' },
      { author: 'map_reader', age: '4 hours ago', score: 6, body: 'Replaying the same POI path in Custom battles beats learning only in Ranked.' },
    ],
  },
  {
    slug: 'what-to-check-after-a-enlisted-2-patch', category: 'Patch Talk', categoryTone: 'orange',
    title: 'What should I check before playing after a Enlisted patch?',
    excerpt: 'The patch-day checklist recommends checking build status, updating, and testing in a bot lobby before queueing.',
    author: 'guide_team', age: '9 hours ago', commentsCount: 2, upvotes: 42, flair: 'Guide Q&A',
    sourceTitle: 'BattlEye patch day checklist', sourcePath: '/blog/eac-patch-day-checklist/',
    body: ['Check the current build/status notice first. After a game update, wait for a compatible build, update the loader, then verify the setup in a bot or Combined arms lobby before returning to ranked.', 'If anything behaves unexpectedly, stop and review the status notes rather than assuming the old setup still applies. The checklist covers the patch-day routine in more detail.'],
    comments: [
      { author: 'farm_pattern', age: '8 hours ago', score: 12, body: 'Testing after the update before ranked is the part I used to skip. Now I check the build note and run a quick bot lobby.' },
      { author: 'support_main_5', age: '7 hours ago', score: 7, body: 'Agree. If the build/status has not caught up, wait. A checklist is better than guessing.' },
    ],
  },
  {
    slug: 'enlisted-2-lite-or-pro-hero-scripts', category: 'Community', categoryTone: 'green',
    title: 'Lite or Pro: which tier includes player aimbot?',
    excerpt: 'Our comparison guide breaks down the difference: Lite focuses on vision tools; Pro adds script modules.',
    author: 'guide_team', age: '12 hours ago', commentsCount: 1, upvotes: 31, flair: 'Guide Q&A',
    sourceTitle: 'Enlisted Lite vs Pro: feature comparison', sourcePath: '/blog/enlisted-lite-vs-pro/',
    body: ['According to the comparison guide, Lite centers on map awareness features such as player ESP, chest and loot information, zoom, and stream-proof options. Pro includes those features and adds player aimbot such as Aimbot, Smooth Aim, Sticky Aim, Bone Priority, and Hotkey macros.', 'The best fit depends on which features you need. Read the full comparison before choosing.'],
    comments: [
      { author: 'one_more_game', age: '10 hours ago', score: 10, body: 'The comparison page is useful because it shows which modules are included in each tier instead of only listing headlines.' },
    ],
  },
  {
    slug: 'how-to-learn-weapon-aim-in-creative', category: 'Guides & Builds', categoryTone: 'blue',
    title: 'How can I practice weapon aim without waiting for a real match?',
    excerpt: 'Create a Custom battles island or bot lobby and drill AR, SMG, and shotgun profiles with repeatable resets.',
    author: 'guide_team', age: '1 day ago', commentsCount: 2, upvotes: 27, flair: 'Guide Q&A',
    sourceTitle: 'Enlisted Custom battle practice guide: aim drills before ranked', sourcePath: '/blog/enlisted-cheat-codes-guide/',
    body: ['Create a Custom battles island or bot lobby. Practice one weapon profile at a time—AR, SMG, then shotgun—and reset between attempts.', 'For realistic timing, use your Ranked smoothness values in Custom battles before enabling aimbot in live games. The linked guide covers the full practice workflow.'],
    comments: [
      { author: 'mid_or_feed', age: '20 hours ago', score: 10, body: 'Start with a bot target and repeat the same spray until the tracking feels automatic.' },
      { author: 'ancient_archivist', age: '18 hours ago', score: 5, body: 'Keep Ranked presets conservative—Custom battles can hide how snappy your aim looks in replays.' },
    ],
  },
  ...additionalGuidePosts,
];

export function getForumPost(slug: string): ForumPost | undefined {
  return forumPosts.find((post) => post.slug === slug);
}
