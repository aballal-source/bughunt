CREATE TYPE bug_status AS ENUM ('open', 'confirmed', 'patched');
CREATE TYPE bug_severity AS ENUM ('low', 'medium', 'high', 'critical');

CREATE TABLE IF NOT EXISTS users (
    user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(50) UNIQUE NOT NULL,
    user_email VARCHAR(255) UNIQUE NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS games (
    game_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    game_name VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS bug_reports (
    bug_report_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(user_id),
    game_id UUID REFERENCES games(game_id),
    title VARCHAR(255) NOT NULL,
    description VARCHAR(5000) NOT NULL,
    severity bug_severity NOT NULL,
    steps_to_reproduce TEXT NOT NULL,
    platform VARCHAR(50) NOT NULL,
    status bug_status DEFAULT 'open',
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS upvotes (
    upvote_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(user_id),
    bug_report_id UUID REFERENCES bug_reports(bug_report_id),
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(user_id, bug_report_id)
);