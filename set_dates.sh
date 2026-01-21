#!/bin/bash
# Script to set commit dates for rebase

# Counter for commits
count=0

# Function to set date based on count
set_date() {
    case $count in
        0) date="10 hours ago" ;;
        1) date="9 hours ago" ;;
        2) date="8 hours ago" ;;
        3) date="7 hours ago" ;;
        4) date="6 hours ago" ;;
        *) date="6 hours ago" ;;
    esac
    export GIT_AUTHOR_DATE="$date"
    export GIT_COMMITTER_DATE="$date"
    ((count++))
}

# Call set_date for each commit
set_date