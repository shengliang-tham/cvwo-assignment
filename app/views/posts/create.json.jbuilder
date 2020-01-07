json.data do
  json.set! :posts do 
    @posts.each do |post|
      json.set! post.id do 
        json.(post,:id,:title)
      end
    end
  end

  json.set! :columns do 
    @columns.each do |column|
      json.set! column.id do 
        json.(column,:id,:title,:post_id,:column_order)
      end
    end
  end

  json.set! :columnOrder do 
    tempArray = []
    @columns.sort_by { |sorted| sorted['column_order']}.each do |column|
      tempArray.push(column.id)
    end
    json.array! tempArray
  end
end
