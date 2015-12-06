# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150729025450) do

  create_table "addresses", force: :cascade do |t|
    t.float    "lng",             limit: 24
    t.float    "lat",             limit: 24
    t.integer  "capacity",        limit: 4
    t.string   "contact",         limit: 255
    t.text     "description",     limit: 65535
    t.integer  "house",           limit: 4
    t.string   "address",         limit: 255
    t.float    "rating",          limit: 24
    t.integer  "user_id",         limit: 4
    t.datetime "created_at",                    null: false
    t.datetime "updated_at",                    null: false
    t.string   "title",           limit: 255
    t.integer  "region_id",       limit: 4
    t.boolean  "parking",         limit: 1
    t.float    "square",          limit: 24
    t.float    "price",           limit: 24
    t.string   "image",           limit: 255
    t.boolean  "air_conditioner", limit: 1
    t.boolean  "ceiling_fan",     limit: 1
    t.boolean  "bed",             limit: 1
    t.boolean  "washing_machine", limit: 1
    t.boolean  "television",      limit: 1
    t.boolean  "network",         limit: 1
    t.boolean  "table",           limit: 1
    t.boolean  "chair",           limit: 1
  end

  add_index "addresses", ["user_id"], name: "index_addresses_on_user_id", using: :btree

  create_table "chats", force: :cascade do |t|
    t.integer  "user_id",    limit: 4
    t.string   "content",    limit: 255
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  create_table "comments", force: :cascade do |t|
    t.text     "content",    limit: 65535
    t.integer  "user_id",    limit: 4
    t.integer  "review_id",  limit: 4
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
    t.string   "image",      limit: 255
  end

  add_index "comments", ["review_id"], name: "index_comments_on_review_id", using: :btree
  add_index "comments", ["user_id"], name: "index_comments_on_user_id", using: :btree

  create_table "identities", force: :cascade do |t|
    t.integer  "user_id",      limit: 4
    t.string   "provider",     limit: 255
    t.string   "accesstoken",  limit: 255
    t.string   "refreshtoken", limit: 255
    t.string   "uid",          limit: 255
    t.string   "name",         limit: 255
    t.string   "email",        limit: 255
    t.string   "nickname",     limit: 255
    t.string   "image",        limit: 255
    t.string   "phone",        limit: 255
    t.string   "urls",         limit: 255
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
  end

  add_index "identities", ["user_id"], name: "index_identities_on_user_id", using: :btree

  create_table "images", force: :cascade do |t|
    t.integer  "address_id", limit: 4
    t.string   "photo",      limit: 255
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
    t.boolean  "is_main",    limit: 1
  end

  create_table "menus", force: :cascade do |t|
    t.string   "name",       limit: 255
    t.string   "ancestry",   limit: 255
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
    t.string   "url",        limit: 255
    t.integer  "postion",    limit: 4
  end

  add_index "menus", ["ancestry"], name: "index_menus_on_ancestry", using: :btree

  create_table "regions", force: :cascade do |t|
    t.string   "province",   limit: 255
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
    t.boolean  "is_home",    limit: 1
  end

  create_table "reviews", force: :cascade do |t|
    t.text     "content",    limit: 65535
    t.float    "point",      limit: 24,    default: 0.0
    t.integer  "user_id",    limit: 4
    t.integer  "address_id", limit: 4
    t.datetime "created_at",                             null: false
    t.datetime "updated_at",                             null: false
    t.string   "image",      limit: 255
  end

  add_index "reviews", ["address_id"], name: "index_reviews_on_address_id", using: :btree
  add_index "reviews", ["user_id"], name: "index_reviews_on_user_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "name",                   limit: 255
    t.integer  "age",                    limit: 4
    t.string   "job",                    limit: 255
    t.string   "address",                limit: 255
    t.string   "phone_number",           limit: 255
    t.string   "provider",               limit: 255
    t.string   "uid",                    limit: 255
    t.integer  "role",                   limit: 4
    t.datetime "created_at",                                      null: false
    t.datetime "updated_at",                                      null: false
    t.string   "email",                  limit: 255, default: "", null: false
    t.string   "encrypted_password",     limit: 255, default: "", null: false
    t.string   "reset_password_token",   limit: 255
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          limit: 4,   default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip",     limit: 255
    t.string   "last_sign_in_ip",        limit: 255
    t.string   "avatar",                 limit: 255
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

  add_foreign_key "addresses", "users"
  add_foreign_key "comments", "reviews"
  add_foreign_key "comments", "users"
  add_foreign_key "identities", "users"
  add_foreign_key "reviews", "addresses"
  add_foreign_key "reviews", "users"
end
