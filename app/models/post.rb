class Post
  # Connect to the database
  if(ENV['DATABASE_URL'])
          uri = URI.parse(ENV['DATABASE_URL'])
          DB = PG.connect(uri.hostname, uri.port, nil, nil, uri.path[1..-1], uri.user, uri.password)
    else
          DB = PG.connect(host: "localhost", port: 5432, dbname: 'mem_development')
  end

  #Pulls all the posts along with their user who created it
  def self.all
    results = DB.exec(
      <<-SQL
        SELECT
          posts.*
        FROM posts
      SQL
    )
    return results.map do |result|
      {
        "id" => result["id"].to_i,
        "url" => result["url"],
        "user_id" => result["user_id"].to_i
      }
    end
  end

  # Pulls one specific Post
  def self.find(id)
    results = DB.exec(
      <<-SQL
        SELECT
          posts.*
        FROM posts
        JOIN users
          ON posts.user_id = users.id
        WHERE posts.id = #{id};
      SQL
    ).first
    return {
      "id" => results["id"].to_i,
      "url" => results["url"],
      "user_id" => results["user_id"].to_i,
      "username" => results["username"]
    }
  end

  # Create a new Post
  def self.create(opts)
    results = DB.exec(
      <<-SQL
        INSERT INTO posts (url, user_id)
        VALUES ( '#{opts["url"]}', #{opts["user_id"]})
        RETURNING id, url, user_id;
      SQL
    ).first
    return {
      "id" => results["id"].to_i,
      "url" => results["url"],
      "user_id" => results["user_id"].to_i
    }
  end

  # Delete a post at ID
  def self.delete(id)
    results = DB.exec(
      <<-SQL
        DELETE FROM posts WHERE id = #{id};
      SQL
    )
    return { "DELETED" => true }
  end

  # Update a post at ID
  def self.update(id, opts)
    results = DB.exec(
      <<-SQL
        UPDATE posts
        SET url = '#{opts["url"]}',
            user_id = #{opts["user_id"]}
        WHERE id = #{id}
        RETURNING id, url, user_id;
      SQL
    ).first
    return {
      "id" => results["id"].to_i,
      "url" => results["url"],
      "user_id" => results["user_id"].to_i
    }
  end
end
