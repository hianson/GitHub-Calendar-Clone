class CreatePracticeSessions < ActiveRecord::Migration[5.1]
  def change
    create_table :practice_sessions do |t|
      t.references :user, foreign_key: true
      t.datetime :start_time
      t.datetime :end_time
      t.text :description
      t.text :tags, array: true, default: []

      t.timestamps
    end
  end
end
