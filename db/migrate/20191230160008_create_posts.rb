class CreatePosts < ActiveRecord::Migration[6.0]
  def change
    create_table :posts do |t|
      t.string :title
      t.string :user_id
      t.integer :column_id
      t.integer :post_order
      t.timestamps
    end
  end
end
