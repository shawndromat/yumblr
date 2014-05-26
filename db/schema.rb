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

ActiveRecord::Schema.define(version: 20140526012754) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "ingredient_entries", force: true do |t|
    t.integer  "amount"
    t.string   "unit"
    t.integer  "recipe_id",     null: false
    t.integer  "ingredient_id", null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "rank",          null: false
    t.string   "fraction"
  end

  add_index "ingredient_entries", ["ingredient_id"], name: "index_ingredient_entries_on_ingredient_id", using: :btree
  add_index "ingredient_entries", ["recipe_id"], name: "index_ingredient_entries_on_recipe_id", using: :btree

  create_table "ingredients", force: true do |t|
    t.string   "name",       null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "ingredients", ["name"], name: "index_ingredients_on_name", unique: true, using: :btree

  create_table "recipes", force: true do |t|
    t.string   "title",      null: false
    t.text     "photo_url"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "owner_id",   null: false
  end

  add_index "recipes", ["owner_id"], name: "index_recipes_on_owner_id", using: :btree

  create_table "steps", force: true do |t|
    t.text     "body",       null: false
    t.integer  "recipe_id",  null: false
    t.integer  "rank",       null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "steps", ["recipe_id"], name: "index_steps_on_recipe_id", using: :btree

  create_table "users", force: true do |t|
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "username",               default: "", null: false
  end

  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
  add_index "users", ["username"], name: "index_users_on_username", unique: true, using: :btree

end
