class CreateColumns < ActiveRecord::Migration[6.0]
  def change
    create_table :columns do |t|
      t.string :title
      t.text :post_id, array: true, default: []
      t.integer :column_order

      t.timestamps
    end
  end
end
