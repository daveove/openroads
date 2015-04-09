### Resetting counters after bulk upload

After a bulk upload with Osmosis, sequence counters must be reset so that the database auto-increments the primary key id of the model.

Here is how to reset the counters to the maximum value of the model primary key:

```plpgsql
select setval('acls_id_seq', (select max(id) from acls));
select setval('changesets_id_seq', (select max(id) from changesets));
select setval('countries_id_seq', (select max(id) from countries));
select setval('current_nodes_id_seq', (select max(id) from current_nodes));
select setval('current_relations_id_seq', (select max(id) from
current_relations));
select setval('current_ways_id_seq', (select max(id) from current_ways));
select setval('diary_comments_id_seq', (select max(id) from
diary_comments));
select setval('diary_entries_id_seq', (select max(id) from diary_entries));
select setval('friends_id_seq', (select max(id) from friends));
select setval('gpx_file_tags_id_seq', (select max(id) from gpx_file_tags));
select setval('gpx_files_id_seq', (select max(id) from gpx_file_ids));
select setval('messages_id_seq', (select max(id) from messages));
select setval('sessions_id_seq', (select max(id) from sessions));
select setval('user_tokens_id_seq', (select max(id) from user_tokens));
select setval('users_id_seq', (select max(id) from users));
```
