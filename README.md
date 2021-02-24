## Ticket Monitoring Tool
**Google Chrome extension** that works on Ticket Management System and notifies user when new ticket appears.

Extension operates on a list of tickets sorted by creation time in descending order.
After activating current time is saved in browser's memory as a variable of type Date. It then refreshes page at a set rate (in seconds), each time reading youngest ticket's creation time, converting it from string (in "yyyy-mm-dd hh:mm:ss" format) to object of type Date and comparing it with stored reference time.

If ticket with younger creation time appears extension notifies user by sound alert and opens ticket details in a new window. Next, the reference time is updated to current moment enabling further extension's activity.
