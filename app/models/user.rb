class User
  if(ENV['DATABASE_URL'])
        uri = URI.parse(ENV['DATABASE_URL'])
        DB = PG.connect(uri.hostname, uri.port, nil, nil, uri.path[1..-1], uri.user, uri.password)
    else
        DB = PG.connect(host: "localhost", port: 5432, dbname: 'mem_development')
    end

  def self.all
    results = DB.exec(
      <<-SQL
        SELECT
          *
        FROM users;
      SQL
    )
    return results.map do |result|
      {
        "id" => result["id"].to_i,
        "username" => result["username"],
        "passworld" => result["password"]
      }
    end
  end

  def self.find(id)
    results = DB.exec(
      <<-SQL
        SELECT
          users.*
        FROM users
        WHERE users.id =#{id};
      SQL
    ).first

  return {
      "id" => results["id"].to_i,
      "username" => results["username"],
      "password" => results["password"]
    }
  end

  def self.create(opts)
    results = DB.exec(
        <<-SQL
            INSERT INTO users (username, password)
            VALUES ('#{opts["username"]}', '#{opts["password"]}')
            RETURNING id, username, password;
        SQL
    )
    return {
        "id" => results.first["id"].to_i,
        "username" => results.first["username"],
        "password" => results.first["password"]
    }
  end

  def self.delete(id)
    results = DB.exec("DELETE FROM users WHERE id=#{id};")
    return {"deleted" => true}
  end

  def self.update(id, opts)
    results = DB.exec(
        <<-SQL
            UPDATE users
            SET username='#{opts["username"]}', password='#{opts["password"]}'
            WHERE id=#{id}
            RETURNING id, username, password
        SQL
    )
    return {
        "id" => results.first["id"].to_i,
        "username" => results.first["username"],
        "password" => results.first["password"]
    }
  end

  def self.findByName(name)
    results = DB.exec(
        <<-SQL
          SELECT
            users.*
          WHERE username = #{name};
        SQL
    )
    return {
        "id" => results.first["id"].to_i,
        "username" => results.first["username"],
        "password" => results.first["password"]
    }
  end
end
