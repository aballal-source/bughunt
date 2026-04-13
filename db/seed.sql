INSERT INTO games (game_name) VALUES ('League of Legends');
INSERT INTO games (game_name) VALUES ('Apex Legends');
INSERT INTO games (game_name) VALUES ('Fortnite');
INSERT INTO games (game_name) VALUES ('Rocket League');
INSERT INTO games (game_name) VALUES ('Minecraft');

INSERT INTO users (username, user_email, user_password, is_admin) VALUES ('Ahmed', 'ahmed@example.com', '$2b$12$placeholder_hashed_password', TRUE);
INSERT INTO users (username, user_email, user_password, is_admin) VALUES ('Moe', 'moe@example.com', '$2b$12$placeholder_hashed_password', FALSE);
INSERT INTO users (username, user_email, user_password, is_admin) VALUES ('Med', 'med@example.com', '$2b$12$placeholder_hashed_password', FALSE);

INSERT INTO bug_reports (user_id, game_id, title, description, severity, steps_to_reproduce, platform, status)
VALUES (
        (SELECT user_id FROM users WHERE username = 'Ahmed'),
        (SELECT game_id FROM games WHERE game_name = 'League of Legends'),
        'Game crashes on champion select',
        'The game completely crashes when banning a champion during ranked select',
        'high',
        '1. Launch game 2. Enter ranked queue 3. Get to ban phase 4. Click any champion to ban',
        'PC',
        'open'
       );
INSERT INTO bug_reports (user_id, game_id, title, description, severity, steps_to_reproduce, platform, status)
VALUES (
        (SELECT user_id FROM users WHERE username = 'Moe'),
        (SELECT game_id FROM games WHERE game_name = 'League of Legends'),
        'Game will not launch',
        'The game does not start when I double-click the launcher',
        'critical',
        '1. Double-click game launcher 2. Wait',
        'PC',
        'open'
       );
INSERT INTO bug_reports (user_id, game_id, title, description, severity, steps_to_reproduce, platform, status)
VALUES (
        (SELECT user_id FROM users WHERE username = 'Moe'),
        (SELECT game_id FROM games WHERE game_name = 'League of Legends'),
        'Runes not saving',
        'My rune page reverts to dark harvest even after customizing during champ select',
        'medium',
        '1. Enter game queue 2. Select champion 3. Customize rune page to anything but dark harvest 4. Save changes 5. Enter loading screen to see changes not applied',
        'PC',
        'confirmed'
       );
INSERT INTO bug_reports (user_id, game_id, title, description, severity, steps_to_reproduce, platform, status)
VALUES (
        (SELECT user_id FROM users WHERE username = 'Moe'),
        (SELECT game_id FROM games WHERE game_name = 'Fortnite'),
        'Audio does not work in no-build mode',
        'The game audio does not start when I double-click the launcher',
        'low',
        '1. Launch game 2. Confirm music and SFX play 3. Select no-build mode',
        'Nintendo Switch',
        'patched'
       );
INSERT INTO bug_reports (user_id, game_id, title, description, severity, steps_to_reproduce, platform, status)
VALUES (
        (SELECT user_id FROM users WHERE username = 'Med'),
        (SELECT game_id FROM games WHERE game_name = 'Fortnite'),
        'Voice chat disappears',
        'Whenever I use voice chat in game after the first match voice chat disappears',
        'high',
        '1. Launch game 2. Play a match with voice chat 3. Play another match',
        'PC',
        'open'
       );
INSERT INTO bug_reports (user_id, game_id, title, description, severity, steps_to_reproduce, platform, status)
VALUES (
        (SELECT user_id FROM users WHERE username = 'Ahmed'),
        (SELECT game_id FROM games WHERE game_name = 'Minecraft'),
        'Nether Portal Exploits',
        'Created a nether portal with one block and snow',
        'low',
        '1. Enter game 2. Build nether portal 3. Break the portal with pickaxe until one block remains 4. Wait for snowfall',
        'PC',
        'open'
       );
INSERT INTO bug_reports (user_id, game_id, title, description, severity, steps_to_reproduce, platform, status)
VALUES (
        (SELECT user_id FROM users WHERE username = 'Moe'),
        (SELECT game_id FROM games WHERE game_name = 'League of Legends'),
        'Loading screen % not finished, but my team is already in game.',
        'Hey, sometimes I queue up for SoloQ and my % loading is stuck somewhere, but my team will get in-game. I have to alt + f4 and reload in order to join.',
        'high',
        '1. Enter ranked queue 2. Ban a champion 3. Select a champion 4. Enter loading screen',
        'PC',
        'open'
       );
INSERT INTO bug_reports (user_id, game_id, title, description, severity, steps_to_reproduce, platform, status)
VALUES (
        (SELECT user_id FROM users WHERE username = 'Moe'),
        (SELECT game_id FROM games WHERE game_name = 'Apex Legends'),
        'Game randomly closes mid-match',
        'My game closes with no error in the middle of a match',
        'medium',
        '1. Enter game 2. Play through the entire match',
        'PC',
        'patched'
       );
INSERT INTO bug_reports (user_id, game_id, title, description, severity, steps_to_reproduce, platform, status)
VALUES (
        (SELECT user_id FROM users WHERE username = 'Moe'),
        (SELECT game_id FROM games WHERE game_name = 'Rocket League'),
        'Game type not displayed',
        'Does not say Competitive under the scorecard on top. Maybe intentional, but I want it back',
        'low',
        '1. Launch game 2. Select competitive match and enter queue 3. Join game',
        'PC',
        'patched'
       );
INSERT INTO bug_reports (user_id, game_id, title, description, severity, steps_to_reproduce, platform, status)
VALUES (
        (SELECT user_id FROM users WHERE username = 'Med'),
        (SELECT game_id FROM games WHERE game_name = 'Minecraft'),
        'The Pink Glitch',
        'A major bug is happening where textures turn pink, causing severe lag and eventual crash',
        'critical',
        '1. Launch game 2. Join The Hive featured server 3. Play for a long time',
        'PC',
        'open'
       );

INSERT INTO upvotes (user_id, bug_report_id)
VALUES (
        (SELECT user_id FROM users WHERE username = 'Ahmed'),
        (SELECT bug_report_id FROM bug_reports WHERE title = 'The Pink Glitch')
       );
INSERT INTO upvotes (user_id, bug_report_id)
VALUES (
        (SELECT user_id FROM users WHERE username = 'Moe'),
        (SELECT bug_report_id FROM bug_reports WHERE title = 'The Pink Glitch')
       );
INSERT INTO upvotes (user_id, bug_report_id)
VALUES (
        (SELECT user_id FROM users WHERE username = 'Med'),
        (SELECT bug_report_id FROM bug_reports WHERE title = 'Game type not displayed')
       );
INSERT INTO upvotes (user_id, bug_report_id)
VALUES (
        (SELECT user_id FROM users WHERE username = 'Ahmed'),
        (SELECT bug_report_id FROM bug_reports WHERE title = 'Nether Portal Exploits')
       );
INSERT INTO upvotes (user_id, bug_report_id)
VALUES (
        (SELECT user_id FROM users WHERE username = 'Moe'),
        (SELECT bug_report_id FROM bug_reports WHERE title = 'Game crashes on champion select')
       );